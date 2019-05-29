import os
import boto3


REGION_NAME = os.environ.get('AWS_REGION_NAME')

def boto3_session():
    return boto3.session.Session(
        region_name=REGION_NAME,
        aws_access_key_id=os.environ.get('S3_ACCESS_KEY_ID'),
        aws_secret_access_key=os.environ.get('S3_SECRET_ACCESS_KEY')
    )


class S3:
    def __init__(self):
        self.session = boto3_session()
        self.resource = self.session.resource('s3')


    def upload_file(self, acl='public-read', **kwargs):
        '''
        Required attributes
        {
            Bucket: 'my-bucket',
            Key: 'hello-world/folder/file.json',
            Filename: /path/of/your/file.json
        }
        '''
        kwargs['ExtraArgs'] = {"ACL": acl}
        try:
            self.resource.meta.client.upload_file(**kwargs)
        except Exception as e:
            raise e
        return "{}/{}".format(
            'https://s3.{}.amazonaws.com/{}'.format(REGION_NAME, kwargs['Bucket']),
            kwargs['Key']
        )
