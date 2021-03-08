# infrastructure

## resources

[terraform on azure](https://gmusumeci.medium.com/getting-started-with-terraform-and-microsoft-azure-a2fcb690eb67)
[microsoft azure cli image](https://docs.microsoft.com/en-us/cli/azure/run-azure-cli-docker)
[terraform docker install](https://gist.github.com/gsweene2/aa4229c163d500965e5674ee4418bf7a)

## running azure cli and terraform

[azure cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) and [terraform](https://www.terraform.io/downloads.html) are needed to build infrastructure

terraform and azure cli can be installed on your local machine, and the commands can be run in this folder

there is also a docker image included in this folder if you do not want to worry about installing anything locally. Running `./docker-build` will build a docker image called `"rbsports/infrastructure"` with azure cli and terraform installed. This only needs to be done once. After this image has been built, `./docker-run` will load the docker image with the current folder mounted at `/infrastructure`. `cd infrastructure` will take you to the infrastructure folder and any changes made on your local machine will be reflected in the docker image

## authentication

there needs to be four env variables set to run terraform against azure

```
ARM_SUBSCRIPTION_ID
ARM_CLIENT_ID
ARM_CLIENT_SECRET
ARM_TENANT_ID
```

I found it easiest to add a file "azurecreds.sh" and export the correct variables

```
export ARM_SUBSCRIPTION_ID="..."
export ARM_CLIENT_ID="..."
export ARM_CLIENT_SECRET="..."
export ARM_TENANT_ID="..."
```

and run the file with `. azurecreds.sh` to export into the current bash session

## getting infrastructure set up

this only needed to be done once, keeping here for future reference

1. create service account
2. run without backend settings to create backend storage
3. add backend settings and current state was uploaded to azure
