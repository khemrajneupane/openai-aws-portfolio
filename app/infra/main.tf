terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "us-east-1" # Using us-east-1 for free tier eligibility
}

# Lambda function for demo purposes
resource "aws_lambda_function" "portfolio_demo_lambda" {
  function_name = "portfolio-demo-lambda"
  role          = aws_iam_role.lambda_exec.arn
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  filename      = "${path.module}/lambda.zip"
  memory_size   = 128 # Free tier eligible
  timeout       = 3   # Free tier eligible

  environment {
    variables = {
      DEMO_ENV = "portfolio"
    }
  }
}

resource "aws_iam_role" "lambda_exec" {
  name = "portfolio_lambda_exec_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# SQS queue for demo purposes
resource "aws_sqs_queue" "portfolio_demo_queue" {
  name                      = "portfolio-demo-queue.fifo"
  fifo_queue                = true
  content_based_deduplication = true
  delay_seconds             = 0
  max_message_size          = 262144 # 256KB
  message_retention_seconds = 345600 # 4 days
  receive_wait_time_seconds = 0
}

# Redis (ElastiCache) cluster - using free tier eligible node type
resource "aws_elasticache_cluster" "portfolio_demo_redis" {
  cluster_id           = "portfolio-redis"
  engine              = "redis"
  node_type           = "cache.t2.micro" # Free tier eligible
  num_cache_nodes     = 1
  parameter_group_name = "default.redis6.x"
  engine_version      = "6.x"
  port                = 6379
}