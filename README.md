# Deploying Netlify sites as a CloudFormation custom resource

This example serverless project will provision a Netlify site as part of your serverless stack.

For more [details watch the video](https://youtu.be/AQ-f-U8Pncc).

## Setup

1. Install the dependancies

		npm install

2. [Configure the serverless framework locally](https://serverless.com/framework/docs/providers/aws/guide/credentials/) (if not already done)

3. Copy `config.example.json` to `config.json` and fill in your github and netlify tokens

4. Configure the `Custom::NetlifySite` resource in `serverless.yml`

		resources:
		  Resources:
		    myNetlifySite:
		      Type: Custom::NetlifySite
		      Properties:
		        # References provision lambda in correct region
		        ServiceToken: {
		          "Fn::Join": ["",
		            ["arn:aws:lambda:",{"Ref":"AWS::Region"},":453208706738:function:custom-resource-netlify-site"]
		          ]
		        }
		        netlifyToken: ${file(config.json):netlifyToken}
		        githubToken: ${file(config.json):githubToken}
		        name: netlify-site-from-custom-resource
		        # custom_domain: lol-wow-cool.com
		        build_settings:
		          repo_url: https://github.com/DavidWells/test-site
		          repo_branch: master
		          dir: build
		          cmd: npm run build
		          allowed_branches:
		          - master
		          env:
		            MY_ENV_KEY: hello
		            MY_OTHER_KEY: there

5. Then deploy with `sls deploy`

## Custom Resource Properties

<!-- AUTO-GENERATED-CONTENT:START (GENERATE_SCHEMA_TABLE:path=./lib/schema.js) -->
| Name | type | description |
|:------------|:-----|:-----|
| **ServiceToken** | *string* | Function arn of Netlify custom resource lambda (required) |
| **netlifyToken** | *string* | Netlify API token. (required) |
| **githubToken** | *string* | Github API token (optional) |
| **custom_domain** | *string* | Custom domain of your site. (optional) |
| **build_settings** | *object* | Netlify build settings (required) |
| **build_settings.repo_url** | *string* | Url of the git repository (required) |
| **build_settings.repo_branch** | *string* | git branch to trigger site builds (optional) |
| **build_settings.cmd** | *string* | Site build command. IE "npm run build" etc. (optional) |
| **build_settings.dir** | *string* | Directory that contains the built HTML files & assets to be deployed (required) |
| **build_settings.allowed_branches** | *array* | Default build command (optional) |
| **build_settings.env** | *object* | Environment variables available for build environment & in Netlify functions (optional) |
<!-- AUTO-GENERATED-CONTENT:END -->

## Deploying

Run the `sls deploy` command to deploy the serverless service

```
npx serverless deploy
```

## Tear down

Run the `sls remove` command to remove the serverless service from your AWS account

```
npx serverless remove
```