MONIKER=cosmoswithgroups1
CHAIN_ID=cosmoswithgroups
CHAIN_HOME=$(HOME)/.simd
ALICE=cosmos1kdzkazludrnmnzchcxgs6znsjph5ugx4rhljrh
USER2=cosmos106ljn6kds9vegaux0w4jnend97fdm50yec59vq
NOW=$(shell date +%s%3N)
UNAME=$(shell uname)

ifeq ($(UNAME), Linux)
	sed=sed -i
endif
ifeq ($(UNAME), Darwin)
	sed=sed -i ""
endif

.PHONY: help
help:
ifeq ($(UNAME), Linux)
	@echo "git clone https://github.com/cosmos/cosmos-sdk -> git checkout v0.46.0-alpha3 -> make build -> mv build/simd $HOME/go/bin/"
endif
ifeq ($(UNAME), Darwin) # macOS
	@echo "git clone https://github.com/cosmos/cosmos-sdk -> git checkout v0.46.0-alpha3 -> make build -> sudo mv build/simd /usr/local/go/bin/ -> ln -s /usr/local/go/bin/simd /usr/local/bin/simd"
endif


.PHONY: local-clean
local-clean:
	rm -rf $(CHAIN_HOME) && rm -rf $(HOME)/.simapp

.PHONY: local-keys
local-keys:
	simd keys show alice --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME) > /dev/null 2>&1 || (sleep 1; echo "earn noble employ useful space craft staff blast exact pluck siren physical biology short suit oval open legend humble pill series devote wealth hungry") | simd keys add alice --recover --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME)
	simd keys show bob --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME) > /dev/null 2>&1 || (sleep 1; echo "lawn pigeon use festival elder trust wish rose law family about web fiber jealous daughter vote history grant quarter fetch soft poem aware truly") | simd keys add bob --recover --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME)
	simd keys show user1 --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME) > /dev/null 2>&1 || (sleep 1; echo "hello turn increase august raw toss hurdle craft baby arrow aware shield maple net six math chase debris chase wet benefit rent segment beauty") | simd keys add user1 --recover --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME)
	simd keys show user2 --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME) > /dev/null 2>&1 || (sleep 1; echo "high return silly coyote skin trumpet stock bicycle enjoy common exact sure") | simd keys add user2 --recover --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME)

.PHONY: local-init
local-init: local-clean local-keys
	simd init $(MONIKER) --chain-id $(CHAIN_ID) --home $(CHAIN_HOME)
	simd add-genesis-account alice 10000000000000000000000001stake --home $(CHAIN_HOME) --keyring-backend test
	simd gentx alice 1000000000stake --chain-id $(CHAIN_ID) --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME)
	simd collect-gentxs --home $(CHAIN_HOME)
	$(sed) "s/prometheus = false/prometheus = true/" $(CHAIN_HOME)/config/config.toml
	$(sed) "s/cors-allowed-origins = \[\]/cors_allowed_origins = [\"*\"]/" $(CHAIN_HOME)/config/config.toml
	$(sed) "s/laddr = \"tcp:\/\/127.0.0.1:26657\"/laddr = \"tcp:\/\/0.0.0.0:26657\"/" $(CHAIN_HOME)/config/config.toml
	cat $(CHAIN_HOME)/config/app.toml | tr '\n' '\r' | sed "s/# Enable defines if the API server should be enabled.\renable = false/# Enable defines if the API server should be enabled.\renable = true/" | tr '\r' '\n' > /tmp/app.toml.tmp && mv /tmp/app.toml.tmp $(CHAIN_HOME)/config/app.toml
	$(sed) "s/swagger = false/swagger = true/" $(CHAIN_HOME)/config/app.toml
	$(sed) "s/enabled-unsafe-cors = false/enabled-unsafe-cors = true/" $(CHAIN_HOME)/config/app.toml
	$(sed) "s/enable-unsafe-cors = false/enable-unsafe-cors = true/" $(CHAIN_HOME)/config/app.toml

.PHONY: local-start
local-start:
	#simd start --home $(CHAIN_HOME) --grpc-web.enable true --grpc-web.address 0.0.0.0:9091
	simd start --mode validator --home $(CHAIN_HOME)

.PHONY: query-balance
query-balance:
	simd q bank balances $(ALICE) --chain-id $(CHAIN_ID) --home $(CHAIN_HOME)
	simd q bank balances $(USER2) --chain-id $(CHAIN_ID) --home $(CHAIN_HOME)

.PHONY: keys-list
keys-list:
	simd keys list --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME)

.PHONY: bank-send
bank-send:
	simd tx bank send $(ALICE) $(USER2) 1000000000000000stake --chain-id $(CHAIN_ID) --home $(CHAIN_HOME) --keyring-backend test --keyring-dir $(CHAIN_HOME)

.PHONY: create-group
create-group:
	simd tx group create-group $(USER2) $$(echo '{"name": "bla1", "description": "blabbl", "created": $(NOW), "lastEdited": $(NOW), "linkToForum": "", "other": "blabla"}' | base64 -w 0) ./testdata/members.json --chain-id $(CHAIN_ID) --keyring-backend test --keyring-dir $(CHAIN_HOME)

.PHONY: query-groups
query-groups:
	simd q group groups-by-admin $(USER2)
