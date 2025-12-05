# Railway Deployment Guide for Phantom Crop Backend

## Prerequisites
- Railway account (https://railway.app)
- GitHub account
- Backend code pushed to GitHub

## Deployment Steps

### 1. Push Code to GitHub
```bash
cd Phantom_Splice_Backend/Phantom_Splice_Backend
git init
git add .
git commit -m "Initial commit for Railway deployment"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy on Railway

#### Option A: Using Railway Dashboard
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Select the `Phantom_Splice_Backend/Phantom_Splice_Backend` directory
6. Railway will auto-detect Python and deploy

#### Option B: Using Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

### 3. Configure Environment Variables (Optional)
In Railway dashboard:
- Go to your project
- Click "Variables"
- Add any environment variables if needed:
  - `PORT` (automatically set by Railway)
  - `NUMBA_DISABLE_JIT=1` (already in code)

### 4. Get Your Backend URL
After deployment:
- Railway will provide a URL like: `https://your-app.railway.app`
- Test it: `https://your-app.railway.app/health`

### 5. Update Frontend
Edit `phantom-slice/App.tsx`:
```typescript
const [config, setConfig] = useState<BackendConfig>({
  useMock: false,
  serverUrl: 'https://your-app.railway.app/sever'  // ← Update this
});
```

Edit `phantom-slice/manifest.json`:
```json
{
  "host_permissions": [
    "https://your-app.railway.app/*",
    "https://generativelanguage.googleapis.com/*"
  ]
}
```

Rebuild extension:
```bash
cd phantom-slice
npm run build
```

## Configuration Files Created

### railway.json
- Configures Railway deployment
- Sets start command with gunicorn
- Configures workers and timeout

### Procfile
- Backup deployment configuration
- Gunicorn with 2 workers
- 120 second timeout for large images

### requirements.txt
- All Python dependencies
- Includes gunicorn for production

### runtime.txt
- Specifies Python 3.12.0

## Important Notes

### CORS
- Already configured in `app_simple.py`
- Allows all origins with `CORS(app)`

### Port
- Railway automatically sets `PORT` environment variable
- Code reads from `os.environ.get('PORT', 5000)`

### Workers
- Configured for 2 workers (adjust based on Railway plan)
- Can handle multiple concurrent requests

### Timeout
- Set to 120 seconds for large image processing
- Adjust if needed for very large images

### Memory
- rembg requires significant memory
- Railway Hobby plan: 512MB (may need upgrade)
- Railway Pro plan: 8GB (recommended)

## Testing Deployment

### 1. Health Check
```bash
curl https://your-app.railway.app/health
```

Expected response:
```json
{
  "status": "alive",
  "message": "The spirits are ready"
}
```

### 2. Image Processing
```bash
curl -X POST https://your-app.railway.app/sever \
  -F "file=@test-image.jpg" \
  --output result.png
```

## Troubleshooting

### Build Fails
- Check Railway logs
- Ensure all dependencies in requirements.txt
- Verify Python version compatibility

### Out of Memory
- Upgrade Railway plan
- Reduce image size in frontend (already done: 800x800)
- Adjust worker count

### Slow Processing
- First request may be slow (cold start)
- Subsequent requests faster
- Consider Railway Pro for better performance

### CORS Errors
- Verify CORS is enabled in app_simple.py
- Check frontend manifest.json permissions
- Test with curl first

## Monitoring

### Railway Dashboard
- View logs in real-time
- Monitor memory/CPU usage
- Check request metrics

### Logs
```bash
# Using Railway CLI
railway logs
```

## Scaling

### Vertical Scaling
- Upgrade Railway plan for more resources
- Recommended: Pro plan for production

### Horizontal Scaling
- Increase worker count in Procfile
- Monitor memory usage

## Cost Estimation

### Railway Plans
- **Hobby**: $5/month (512MB RAM)
- **Pro**: $20/month (8GB RAM) - Recommended
- **Usage-based**: Pay for what you use

### Recommendations
- Start with Hobby for testing
- Upgrade to Pro for production
- Monitor usage and adjust

## Security

### Environment Variables
- Never commit sensitive data
- Use Railway environment variables
- Keep API keys secure

### HTTPS
- Railway provides HTTPS automatically
- No additional configuration needed

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] Deployment successful
- [ ] Health endpoint working
- [ ] Image processing tested
- [ ] Frontend updated with new URL
- [ ] Extension manifest updated
- [ ] Extension rebuilt and tested
- [ ] CORS working correctly
- [ ] Performance acceptable

## Support

### Railway Documentation
- https://docs.railway.app

### Railway Discord
- https://discord.gg/railway

### Phantom Crop Issues
- Check backend logs
- Test with curl
- Verify frontend configuration

## Status: ✅ READY TO DEPLOY

All configuration files created. Follow the steps above to deploy to Railway!
