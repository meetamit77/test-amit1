# Tri-luminatti

Tri-luminatti is a full-stack running/coaching app with FastAPI backend and React frontend.

## Structure
- `backend/`: FastAPI backend (Python)
- `frontend/`: React frontend (JavaScript)

## Features
- User/Coach management
- Workout planning and calendar
- Strava/Garmin integration
- Chatbot powered by LLM (with optional MCP server)

## Getting Started
See `backend/README.md` and `frontend/README.md` for setup instructions.

## Docker Instructions

- Install docker. The following are the set of instructions for Ubuntu24.04
 ```
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) stable" |   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
```
- Logout and Login. Then run the following command
```
docker compose up
```
- This will run react in localhost:3000 and Fast API BE in localhost:8000. If you want to test with local browser, ssh with tunnels set up correctly
```
ssh -L 3000:localhost:3000 -L 8000:localhost:8000 <your-username>@<vm-ip>
```
