# Deploy Netlify sites via AWS Cloudformation

```

```
# Create Netlify Sites via AWS CloudFormation

Define Netlify sites as part of an [AWS Cloudformation](https://aws.amazon.com/cloudformation/) stack.

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [About](#about)
- [Configuration](#configuration)
- [Properties](#properties)
- [Output Values](#output-values)
- [FAQ](#faq)
  * [What is CloudFormation?](#what-is-cloudformation)
<!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (GENERATE_SCHEMA_TABLE:path=./lib/utils/validator.js) -->
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

## About

This allows for CloudFormation, Serverless, and SAM users in AWS ecosystem to define and deploy a Netlify site as part of their infrastructure stack. Similar to [Netlify Terraform](https://www.terraform.io/docs/providers/netlify/index.html)

This enables users in AWS ecosystem to build robust applications defined as infrastructure as code.

## Configuration

To declare a Netlify Site in your AWS CloudFormation template, use the following syntax:

```yml
myNetlifySite:
  Type: Custom::NetlifySite
  Properties:
    ServiceToken: {
      "Fn::Join": ["",
        ["arn:aws:lambda:",{"Ref":"AWS::Region"},":453208706738:function:custom-resource-netlify-site"]
      ]
    }
    netlifyToken: xyz-123-netlify-token
    githubToken:  xyz-123-github-token
    name: new-new-new-site-new-name
    custom_domain: lol-wow-cool.com
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
```

The value `Fn::Join` value below will resolve to the correct Netlify site provisioning function.

```yaml
ServiceToken: {
  "Fn::Join": ["",
    ["arn:aws:lambda:",{"Ref":"AWS::Region"},":453208706738:function:custom-resource-netlify-site"]
  ]
}
```

If you are using the serverless framework you can use the shorthand variable syntax

```yaml
ServiceToken: "arn:aws:lambda:${AWS::Region}:453208706738:function:custom-resource-netlify-site"
```

## Properties

Schema here

## Output Values

```json
{
  "netlifySiteId": "string",
  "netlifyDeployKeyId": "string",
  "netlifyCreatedWebhookId": "string",
  "netlifyFailedWebhookId": "string",
  "netlifyBuildingWebhookId": "string",
  "githubDeployKeyId": "string",
  "githubWebhookId": "string",
}
```

## FAQ

### What is CloudFormation?

CloudFormation is a powerful Infrastructure as Code tool that can help automate and manage your AWS deployments.

[more info](https://www.thorntech.com/2018/05/whatisawscloudformation/)
