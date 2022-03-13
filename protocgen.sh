#!/usr/bin/env bash

GOPATH=${GOPATH:-"$HOME/go"}
PLATFORM='unknown'
unamestr=$(uname)
if [[ "$unamestr" == 'Linux' ]]; then
   PLATFORM='linux'
elif [[ "$unamestr" == 'Darwin' ]]; then
   PLATFORM='osx'
fi

set -eo pipefail

[ -d src/generated ] || mkdir src/generated
[ -d protoc ] || mkdir protoc
[ -f protoc/bin/protoc ] || (curl -LO "https://github.com/protocolbuffers/protobuf/releases/download/v3.17.3/protoc-3.17.3-$PLATFORM-x86_64.zip" && mv "protoc-3.17.3-$PLATFORM-x86_64.zip" protoc && unzip -d protoc -o "protoc/protoc-3.17.3-$PLATFORM-x86_64.zip")

# TODO this may not work yet, because proto files in cosmos-sdk repo are invalid
# workaround is to copy cosmos-sdk repo, manually add files from here https://github.com/regen-network/regen-ledger/tree/v2.2.0-beta1/third_party/proto
# and in cosmos.proto manually add this:
#extend google.protobuf.FieldOptions {
#    string accepts_interface = 93001;
#
#    string scalar = 93003;
#}

#proto_files=$(find $HOME/projects/temp/cosmos-sdk/proto/cosmos -path -prune -o -name '*.proto')
#go get github.com/cosmos/cosmos-sdk@d10034fbb1f2dd72c49f89c7933baf92cc69313b
proto_files=$(find $GOPATH/pkg/mod/github.com/cosmos/cosmos-sdk@v0.46.0-alpha2.0.20220215170643-d10034fbb1f2/proto/cosmos -path -prune -o -name '*.proto')

for file_path in $proto_files; do
  echo $file_path
  protoc/bin/protoc \
    --plugin=./node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_opt=esModuleInterop=true \
    --ts_proto_out=./src/generated \
    --ts_proto_opt=snakeToCamel=false \
    $file_path \
#     -I $HOME/projects/temp/cosmos-sdk/proto \
#     -I $HOME/projects/temp/cosmos-sdk/third_party/proto
     -I $GOPATH/pkg/mod/github.com/cosmos/cosmos-sdk@v0.46.0-alpha2.0.20220215170643-d10034fbb1f2/proto \
     -I $GOPATH/pkg/mod/github.com/cosmos/cosmos-sdk@v0.46.0-alpha2.0.20220215170643-d10034fbb1f2/third_party/proto
done
