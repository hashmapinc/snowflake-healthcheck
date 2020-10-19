terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 2.70"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

resource "aws_s3_bucket" "b" {
  bucket = "dev-healthcheck.snowflakeinspector.com"
  acl    = "public-read"
  policy = file("bucket_policy.json")

  website {
    index_document = "index.html"
    error_document = "error.html"

  }
}

resource "aws_s3_bucket_public_access_block" "example" {
  bucket = aws_s3_bucket.b.id

  block_public_acls   = true
  block_public_policy = true
}

resource "aws_iam_user" "healthcheck" {
  name = "CircleCI_Healthcheck_Service"
}

resource "aws_iam_access_key" "healthcheck_key" {
  user = aws_iam_user.healthcheck.name
}

resource "aws_iam_user_policy" "healthcheck_policy" {
  name = "healthcheck_policy"
  user = aws_iam_user.healthcheck.name
  policy = file("user_policy.json")
}