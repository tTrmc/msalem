#!/bin/bash

# Build and deployment script for portfolio

echo "🚀 Building portfolio..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build output is in the '.next' directory"
    echo ""
    echo "🌐 To deploy to Vercel:"
    echo "   1. Push to GitHub: git push origin main"
    echo "   2. Connect repo to Vercel dashboard"
    echo "   3. Deploy automatically on push"
    echo ""
    echo "📦 For static export:"
    echo "   1. Uncomment export config in next.config.ts"
    echo "   2. Run: npm run build"
    echo "   3. Deploy 'out' folder to static hosting"
else
    echo "❌ Build failed!"
    exit 1
fi
