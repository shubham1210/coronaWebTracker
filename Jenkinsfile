pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID="354042180171"
        AWS_DEFAULT_REGION="us-east-2" 
        CLUSTER_NAME="java-app"
        SERVICE_NAME="corona-tracker-service"
        TASK_DEFINITION_NAME="corona-jenkins-webtracker"
        DESIRED_COUNT="2"
        IMAGE_REPO_NAME="354042180171.dkr.ecr.us-east-2.amazonaws.com/coronawebtracker"
        IMAGE_TAG="latest"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
	    registryCredential = "demo-admin-user"
    }
   
    stages {
    
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
                      sh "chmod +x -R ${env.WORKSPACE}"
			          sh './script.sh'
                }
            } 
        }
      }      
      
    
    stage('Removing docker images') {
        steps{
            script {
                sh "docker image prune --filter 'label!=node' --filer 'label!=nginx'"
            }
        }
        }
}
