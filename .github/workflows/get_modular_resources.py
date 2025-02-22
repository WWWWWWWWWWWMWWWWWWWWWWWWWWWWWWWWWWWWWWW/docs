import asyncio
import time
import os
import typesense

from viam.rpc.dial import DialOptions, Credentials
from viam.app.viam_client import ViamClient
from viam.proto.app import ListRegistryItemsRequest, ListRegistryItemsResponse


async def connect() -> ViamClient:
    dial_options = DialOptions(
        auth_entity='744b0c18-f6fd-4c8d-a707-d3f261b353cc',
        credentials=Credentials(
            type='api-key',
            payload=os.environ['VIAM_API_KEY']
        )
    )
    return await ViamClient.create_from_dial_options(dial_options)

async def main():

    typesense_client = typesense.Client({
        'api_key': os.environ['TYPESENSE_API_KEY_MR'],
        'nodes': [{
            'host': 'cgnvrk0xwyj9576lp-1.a1.typesense.net',
            'port': '443',
            'protocol': 'https'
        }],
        'connection_timeout_seconds': 2
    })

    time_now = int(time.time())

    # Make a ViamClient
    viam_client = await connect()
    # Instantiate an AppClient called "cloud" to run cloud app API methods on
    cloud = viam_client.app_client
    module_list = await cloud.list_modules()

    for module in module_list:
        if module.visibility == 2:
            for model in module.models:
                json_m = {
                    "id": module.module_id + '-' + model.model,
                    "module_id": module.module_id,
                    "total_organization_usage": module.total_organization_usage,
                    "total_robot_usage": module.total_robot_usage,
                    "url": module.url,
                    "description": module.description,
                    "model": model.model,
                    "api": model.api,
                    "last_updated": time_now
                }
                insert_resp = typesense_client.collections['modular_resources'].documents.upsert(
        json_m)
                print(insert_resp)

    # Create a request to list registry items and get the response from the app
    request = ListRegistryItemsRequest(organization_id=cloud._organization_id)
    response : ListRegistryItemsResponse = await cloud._app_client.ListRegistryItems(request)

    ml_models_list = []
    for item in response.items:
        if item.type == 2:
            ml_models_list.append(item)

    for model in ml_models_list:
        if model.visibility == 2:
            json_m = {
                "id": model.item_id,
                "model_id": model.item_id,
                "total_organization_usage": model.total_organization_usage,
                "total_robot_usage": model.total_robot_usage,
                "description": model.description,
                "last_updated": time_now,
                "url": "https://app.viam.com/ml-model/" + model.public_namespace + "/" + model.name + "/"
            }
            insert_resp = typesense_client.collections['mlmodels'].documents.upsert(
        json_m)
            print(insert_resp)

    viam_client.close()

    # Deleting documents that didn't get updated (presumably deleted)
    try:
        typesense_client.collections['modular_resources'].documents.delete({'filter_by': 'last_updated: <' + time_now})
        typesense_client.collections['mlmodels'].documents.delete({'filter_by': 'last_updated: <' + time_now})
    except Exception as e:
        pass


if __name__ == '__main__':
    asyncio.run(main())
