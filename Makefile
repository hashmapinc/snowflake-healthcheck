devserver: dependencies
		npm run start

build: dependencies
		npm run build

dependencies:
		npm install

terraform:
		cd terraform && \
		terraform init && \
		terraform validate && \
		terraform apply && \
		cd ..