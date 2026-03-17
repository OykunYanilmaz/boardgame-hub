### Docker alias like command creations
```sh
nano ~/.bashrc

docker-clean-all() {
  docker buildx history rm --all
  docker buildx prune -af
  docker system prune -af --volumes
}

docker-clean-keep-images-volumes() {
  docker buildx history rm --all
  docker buildx prune -af
  docker container prune -f
  docker network prune -f
}

source ~/.bashrc
```