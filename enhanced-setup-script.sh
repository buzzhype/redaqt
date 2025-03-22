#!/bin/bash

# RedaQt Enhanced Setup Script
# This script will update and configure the RedaQt application

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 RedaQt Enhanced Setup${NC}"
echo -e "${YELLOW}This script will configure your RedaQt application with additional features${NC}"

# Check if setup-script.sh exists and is executable
if [ ! -f "src/setup-script.sh" ]; then
  echo -e "${RED}❌ Error: setup-script.sh not found in src/ directory${NC}"
  echo -e "Please run this script after placing setup-script.sh in the src/ directory"
  exit 1
fi

# Make sure the base setup script is executable
chmod +x src/setup-script.sh

# Run the base setup script
echo -e "${YELLOW}Running base setup script...${NC}"
cd src && ./setup-script.sh
cd ..

echo -e "${GREEN}✅ Base setup completed${NC}"

# Create the authentication context
echo -e "${BLUE}Creating authentication context...${NC}"

mkdir -p src/contexts

cat > src/contexts/auth-context.tsx << 'AUTH_CONTEXT_EOF'
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Authentication check failed", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const data = await response.json();
      setUser(data.user);
      
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    
    try {
      await fetch("/api/auth/logout");
      setUser(null);
      
      // Redirect to login
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const response = await fetch("/api/auth/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, agreement_terms: true, agreement_policy: true }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }
      
      // Registration successful - the user will need to verify their email
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
AUTH_CONTEXT_EOF

echo -e "${GREEN}✅ Authentication context created${NC}"

# Create middleware for auth protection
echo -e "${BLUE}Creating middleware for route protection...${NC}"

cat > src/middleware.ts << 'MIDDLEWARE_EOF'
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths that don't require authentication
const publicPaths = [
  "/login",
  "/create-account",
  "/forgot-password",
  "/reset-password",
  "/complete-registration",
  "/account-unavailable",
  "/session-expired",
  "/terms-of-service",
  "/privacy-policy",
  "/404",
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if the path is public
  const isPublicPath = publicPaths.some(publicPath => 
    path === publicPath || path.startsWith("/api/auth/") || path.startsWith("/_next/")
  );
  
  // Get the authentication token from the cookies
  const authToken = request.cookies.get("auth_token")?.value;
  
  // If the path requires authentication and there's no token, redirect to login
  if (!isPublicPath && !authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // If the user is authenticated and trying to access a login page, redirect to dashboard
  if (authToken && (path === "/login" || path === "/create-account")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
MIDDLEWARE_EOF

echo -e "${GREEN}✅ Middleware created${NC}"

# Create an uninstall script
echo -e "${BLUE}Creating uninstall script...${NC}"

cat > uninstall-redaqt.sh << 'UNINSTALL_EOF'
#!/bin/bash

# RedaQt Uninstall Script
# This script will remove all RedaQt-specific files

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}⚠️  Warning: This will remove all RedaQt-specific files${NC}"
echo -e "${YELLOW}Are you sure you want to continue? (y/n)${NC}"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
  echo -e "${BLUE}Starting uninstall process...${NC}"
  
  # Remove auth-related directories
  rm -rf src/app/"(auth)"
  rm -rf src/app/terms-of-service
  rm -rf src/app/privacy-policy
  rm -rf src/app/api/auth
  rm -rf src/contexts
  rm -rf src/lib/auth
  rm -rf src/lib/email
  
  # Remove setup scripts
  rm -f src/setup-script.sh
  rm -f enhanced-setup-script.sh
  rm -f src/middleware.ts
  
  echo -e "${GREEN}✅ RedaQt files have been removed${NC}"
else
  echo -e "${BLUE}Uninstall cancelled${NC}"
fi

# Remove this script itself
echo -e "${YELLOW}Do you want to remove this uninstall script as well? (y/n)${NC}"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
  rm -- "$0"
  echo -e "${GREEN}✅ Uninstall script removed${NC}"
fi
UNINSTALL_EOF

chmod +x uninstall-redaqt.sh

echo -e "${GREEN}✅ Uninstall script created${NC}"

# Display completion message
echo -e "\n${GREEN}✅ RedaQt setup completed successfully!${NC}"
echo -e "${BLUE}Files created:${NC}"
echo -e "  - Authentication pages (login, create account, forgot password, etc.)"
echo -e "  - API routes for authentication"
echo -e "  - Authentication context"
echo -e "  - Middleware for route protection"
echo -e "  - Uninstall script (uninstall-redaqt.sh)"

echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Start your development server: ${BLUE}npm run dev${NC} or ${BLUE}yarn dev${NC}"
echo -e "2. Visit http://localhost:3000/login to view the login page"
echo -e "3. Customize the pages to match your design requirements"
echo -e "4. Implement actual backend functionality for the authentication API routes"

echo -e "\n${YELLOW}To remove RedaQt files, run:${NC} ${BLUE}./uninstall-redaqt.sh${NC}"
