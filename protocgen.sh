#!/usr/bin/env bash

set -eo pipefail

[ -d src/generated ] || mkdir src/generated
[ -d protoc ] || mkdir protoc
[ -f protoc/bin/protoc ] || (curl -LO https://github.com/protocolbuffers/protobuf/releases/download/v3.17.3/protoc-3.17.3-linux-x86_64.zip && mv protoc-3.17.3-linux-x86_64.zip protoc && unzip -d protoc -o protoc/protoc-3.17.3-linux-x86_64.zip)

#go get github.com/regen-network/regen-ledger/v2
proto_files=$(find $GOPATH/pkg/mod/github.com/regen-network/regen-ledger/v2@v2.1.0/proto/regen/group/v1alpha1 -path -prune -o -name '*.proto')

for file_path in $proto_files; do
  echo $file_path
  protoc/bin/protoc \
    --plugin=./node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_opt=esModuleInterop=true \
    --ts_proto_out=./src/generated \
    --ts_proto_opt=snakeToCamel=false \
    $file_path \
     -I $GOPATH/pkg/mod/github.com/regen-network/regen-ledger/v2@v2.1.0/proto \
     -I $GOPATH/pkg/mod/github.com/regen-network/regen-ledger/v2@v2.1.0/third_party/proto
done
