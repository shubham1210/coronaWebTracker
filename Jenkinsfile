pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID="354042180171"
        AWS_DEFAULT_REGION="us-east-2" 
        CLUSTER_NAME="java-app"
        SERVICE_NAME="corona-tracker-service"
        TASK_DEFINITION_NAME="cornaweb-tracker-task-definition:1"
        DESIRED_COUNT="2"
        IMAGE_REPO_NAME="354042180171.dkr.ecr.us-east-2.amazonaws.com/coronawebtracker"
        IMAGE_TAG="${env.BUILD_ID}"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
	    registryCredential = "AKIAVE3UO6JF3Z6UVIIF"
    }
   
    stages {

    // Tests
    stage('Unit Tests') {
      steps{
        script {
          sh 'npm install'
	  sh 'npm test -- --watchAll=false'
        }
      }
    }
        
    // Building Docker images
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build "${IMAGE_REPO_NAME}:${IMAGE_TAG}"
        }
      }
    }
   
    // Uploading Docker images into AWS ECR
    stage('Pushing to ECR') {
     steps{  
         script {
			docker.withRegistry("https://" + REPOSITORY_URI, "ecr:${AWS_DEFAULT_REGION}:" + registryCredential) {
                    	dockerImage.push()
                	}
         }
        }
      }
      
    stage('Deploy') {
     steps{
            withAWS(credentials: registryCredential, region: "${AWS_DEFAULT_REGION}") {
                script {
			sh './script.sh'
                }
            } 
        }
      }      
      
    }
}
