terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 2.70"
    }
  }
}

variable "aws_profile" {
  type    = string
  default = "default"
}

provider "aws" {
  profile = var.aws_profile
  region  = "us-east-1"
}

resource "aws_s3_bucket" "healthcheck_bucket" {
  bucket = "healthcheck.snowflakeinspector.com"
  acl    = "public-read"
  policy = file("bucket_policy.json")

  website {
    index_document = "index.html"
    error_document = "index.html"

  }
}

resource "aws_s3_bucket_public_access_block" "healthcheck_bucket_public_access_block" {
  bucket = aws_s3_bucket.healthcheck_bucket.id

  block_public_acls   = true
  block_public_policy = true
}

resource "aws_iam_user" "circleci_healthcheck_service_account" {
  name = "circleci_healthcheck_service_account"
}

resource "aws_iam_access_key" "circleci_healthcheck_service_account_key" {
  user = aws_iam_user.circleci_healthcheck_service_account.name
}

resource "aws_iam_user_policy" "healthcheck_bucket_write_policy" {
  name = "healthcheck.snowflakeinspector.com_s3_bucket_write"
  user = aws_iam_user.circleci_healthcheck_service_account.name
  policy = file("user_policy.json")
}