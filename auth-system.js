// Authentication System for ShopEasy
class AuthSystem {
  constructor() {
    this.currentUser = null;
    this.users = this.loadUsers();
    this.init();
  }

  init() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("shopeasy_user");
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.updateHeaderForLoggedInUser();
    }
    console.log("Authentication System initialized");
  }

  // Load users from localStorage (in real app, this would be a backend API)
  loadUsers() {
    const saved = localStorage.getItem("shopeasy_users");
    return saved ? JSON.parse(saved) : [];
  }

  // Save users to localStorage
  saveUsers() {
    localStorage.setItem("shopeasy_users", JSON.stringify(this.users));
  }

  // Open authentication modal
  openAuthModal() {
    this.createAuthModal();
  }

  createAuthModal() {
    // Remove existing modal
    this.closeAuthModal();

    // Create backdrop
    const backdrop = document.createElement("div");
    backdrop.id = "authModalBackdrop";
    backdrop.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      backdrop-filter: blur(5px);
    `;

    // Create modal
    const modal = document.createElement("div");
    modal.id = "authModal";
    modal.style.cssText = `
      background: linear-gradient(135deg, #ffffff, #f8fafc);
      border-radius: 1.5rem;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
      max-width: 450px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      animation: modalSlideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    modal.innerHTML = this.createAuthContent();

    // Add close button
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "×";
    closeButton.style.cssText = `
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05));
      border: none;
      border-radius: 50%;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      cursor: pointer;
      z-index: 10;
      transition: all 0.2s;
      backdrop-filter: blur(10px);
    `;
    closeButton.onclick = () => this.closeAuthModal();

    modal.appendChild(closeButton);
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    // Close modal when clicking outside
    backdrop.onclick = (e) => {
      if (e.target === backdrop) this.closeAuthModal();
    };

    // Add styles if not already added
    this.addAuthStyles();
  }

  createAuthContent() {
    return `
      <div style="padding: 2rem;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="
            display: inline-flex;
            align-items: center;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 1rem 2rem;
            border-radius: 3rem;
            margin-bottom: 1rem;
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
          ">
            <span style="font-size: 1.5rem; margin-right: 0.75rem;">🛒</span>
            <span style="font-size: 1.25rem; font-weight: 700;">ShopEasy</span>
          </div>
          <h2 style="
            font-size: 1.5rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 0.5rem;
          ">Welcome to ShopEasy</h2>
          <p style="color: #6b7280; font-size: 0.95rem;">
            Sign in to your account or create a new one
          </p>
        </div>

        <!-- Tab Buttons -->
        <div style="
          display: flex;
          background: #f3f4f6;
          border-radius: 1rem;
          padding: 0.25rem;
          margin-bottom: 2rem;
        ">
          <button 
            id="loginTab" 
            onclick="authSystem.switchTab('login')"
            style="
              flex: 1;
              background: #3b82f6;
              color: white;
              border: none;
              padding: 0.75rem;
              border-radius: 0.75rem;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s;
            "
          >
            Sign In
          </button>
          <button 
            id="signupTab" 
            onclick="authSystem.switchTab('signup')"
            style="
              flex: 1;
              background: transparent;
              color: #6b7280;
              border: none;
              padding: 0.75rem;
              border-radius: 0.75rem;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s;
            "
          >
            Sign Up
          </button>
        </div>

        <!-- Login Form -->
        <div id="loginForm" style="display: block;">
          <form onsubmit="authSystem.handleLogin(event)">
            <div style="margin-bottom: 1.5rem;">
              <label style="
                display: block;
                font-weight: 600;
                color: #374151;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
              ">Email or Mobile Number</label>
              <input 
                type="text" 
                id="loginEmail"
                placeholder="Enter email or mobile number"
                required
                style="
                  width: 100%;
                  border: 1px solid #d1d5db;
                  border-radius: 0.75rem;
                  padding: 0.75rem 1rem;
                  font-size: 0.95rem;
                  transition: all 0.2s;
                  box-sizing: border-box;
                "
                onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
              >
            </div>

            <div style="margin-bottom: 1.5rem;">
              <label style="
                display: block;
                font-weight: 600;
                color: #374151;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
              ">Password</label>
              <div style="position: relative;">
                <input 
                  type="password" 
                  id="loginPassword"
                  placeholder="Enter your password"
                  required
                  style="
                    width: 100%;
                    border: 1px solid #d1d5db;
                    border-radius: 0.75rem;
                    padding: 0.75rem 1rem;
                    padding-right: 3rem;
                    font-size: 0.95rem;
                    transition: all 0.2s;
                    box-sizing: border-box;
                  "
                  onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                  onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
                >
                <button 
                  type="button"
                  onclick="authSystem.togglePassword('loginPassword')"
                  style="
                    position: absolute;
                    right: 0.75rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #6b7280;
                    font-size: 1.25rem;
                  "
                >👁️</button>
              </div>
            </div>

            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 2rem;
            ">
              <label style="
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
                color: #6b7280;
                cursor: pointer;
              ">
                <input type="checkbox" id="rememberMe" style="cursor: pointer;">
                Remember me
              </label>
              <a href="#" onclick="authSystem.showForgotPassword()" style="
                color: #3b82f6;
                text-decoration: none;
                font-size: 0.9rem;
                font-weight: 500;
              ">Forgot Password?</a>
            </div>

            <button 
              type="submit"
              style="
                width: 100%;
                background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                color: white;
                border: none;
                padding: 1rem;
                border-radius: 0.75rem;
                font-weight: 600;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.2s;
                margin-bottom: 1rem;
              "
              onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(59, 130, 246, 0.4)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
            >
              Sign In
            </button>
          </form>

          <!-- Social Login -->
          <div style="margin-bottom: 1.5rem;">
            <div style="
              display: flex;
              align-items: center;
              margin-bottom: 1rem;
            ">
              <div style="flex: 1; height: 1px; background: #e5e7eb;"></div>
              <span style="padding: 0 1rem; color: #6b7280; font-size: 0.9rem;">or continue with</span>
              <div style="flex: 1; height: 1px; background: #e5e7eb;"></div>
            </div>

            <div style="display: flex; gap: 1rem;">
              <button onclick="authSystem.socialLogin('google')" style="
                flex: 1;
                background: white;
                border: 1px solid #e5e7eb;
                padding: 0.75rem;
                border-radius: 0.75rem;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                font-weight: 500;
              " onmouseover="this.style.borderColor='#d1d5db'" onmouseout="this.style.borderColor='#e5e7eb'">
                <span style="font-size: 1.25rem;">🌐</span>
                Google
              </button>
              <button onclick="authSystem.socialLogin('facebook')" style="
                flex: 1;
                background: white;
                border: 1px solid #e5e7eb;
                padding: 0.75rem;
                border-radius: 0.75rem;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                font-weight: 500;
              " onmouseover="this.style.borderColor='#d1d5db'" onmouseout="this.style.borderColor='#e5e7eb'">
                <span style="font-size: 1.25rem;">📘</span>
                Facebook
              </button>
            </div>
          </div>
        </div>

        <!-- Signup Form -->
        <div id="signupForm" style="display: none;">
          <form onsubmit="authSystem.handleSignup(event)">
            <div style="margin-bottom: 1.5rem;">
              <label style="
                display: block;
                font-weight: 600;
                color: #374151;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
              ">Full Name</label>
              <input 
                type="text" 
                id="signupName"
                placeholder="Enter your full name"
                required
                style="
                  width: 100%;
                  border: 1px solid #d1d5db;
                  border-radius: 0.75rem;
                  padding: 0.75rem 1rem;
                  font-size: 0.95rem;
                  transition: all 0.2s;
                  box-sizing: border-box;
                "
                onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
              >
            </div>

            <div style="margin-bottom: 1.5rem;">
              <label style="
                display: block;
                font-weight: 600;
                color: #374151;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
              ">Email</label>
              <input 
                type="email" 
                id="signupEmail"
                placeholder="Enter your email"
                required
                style="
                  width: 100%;
                  border: 1px solid #d1d5db;
                  border-radius: 0.75rem;
                  padding: 0.75rem 1rem;
                  font-size: 0.95rem;
                  transition: all 0.2s;
                  box-sizing: border-box;
                "
                onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
              >
            </div>

            <div style="margin-bottom: 1.5rem;">
              <label style="
                display: block;
                font-weight: 600;
                color: #374151;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
              ">Mobile Number</label>
              <input 
                type="tel" 
                id="signupMobile"
                placeholder="Enter your mobile number"
                required
                style="
                  width: 100%;
                  border: 1px solid #d1d5db;
                  border-radius: 0.75rem;
                  padding: 0.75rem 1rem;
                  font-size: 0.95rem;
                  transition: all 0.2s;
                  box-sizing: border-box;
                "
                onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
              >
            </div>

            <div style="margin-bottom: 1.5rem;">
              <label style="
                display: block;
                font-weight: 600;
                color: #374151;
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
              ">Password</label>
              <div style="position: relative;">
                <input 
                  type="password" 
                  id="signupPassword"
                  placeholder="Create a strong password"
                  required
                  style="
                    width: 100%;
                    border: 1px solid #d1d5db;
                    border-radius: 0.75rem;
                    padding: 0.75rem 1rem;
                    padding-right: 3rem;
                    font-size: 0.95rem;
                    transition: all 0.2s;
                    box-sizing: border-box;
                  "
                  onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                  onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
                >
                <button 
                  type="button"
                  onclick="authSystem.togglePassword('signupPassword')"
                  style="
                    position: absolute;
                    right: 0.75rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #6b7280;
                    font-size: 1.25rem;
                  "
                >👁️</button>
              </div>
              <div style="margin-top: 0.5rem; font-size: 0.8rem; color: #6b7280;">
                Password must be at least 6 characters long
              </div>
            </div>

            <div style="margin-bottom: 2rem;">
              <label style="
                display: flex;
                align-items: start;
                gap: 0.75rem;
                font-size: 0.9rem;
                color: #6b7280;
                cursor: pointer;
                line-height: 1.4;
              ">
                <input type="checkbox" id="agreeTerms" required style="margin-top: 0.2rem; cursor: pointer;">
                <span>I agree to the <a href="#" style="color: #3b82f6; text-decoration: none;">Terms & Conditions</a> and <a href="#" style="color: #3b82f6; text-decoration: none;">Privacy Policy</a></span>
              </label>
            </div>

            <button 
              type="submit"
              style="
                width: 100%;
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                border: none;
                padding: 1rem;
                border-radius: 0.75rem;
                font-weight: 600;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.2s;
              "
              onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(16, 185, 129, 0.4)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
            >
              Create Account
            </button>
          </form>
        </div>

        <!-- Benefits Section -->
        <div style="
          margin-top: 2rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          border-radius: 1rem;
          border: 1px solid rgba(59, 130, 246, 0.2);
        ">
          <h4 style="
            color: #1e40af;
            font-weight: 600;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          ">
            ✨ Benefits of Creating Account
          </h4>
          <div style="display: grid; gap: 0.75rem; font-size: 0.9rem; color: #1e40af;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span>🛒</span>
              <span>Save items in cart and wishlist</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span>📦</span>
              <span>Track your orders easily</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span>🎯</span>
              <span>Get personalized recommendations</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span>🎉</span>
              <span>Exclusive deals and offers</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  switchTab(tab) {
    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    if (tab === "login") {
      loginTab.style.background = "#3b82f6";
      loginTab.style.color = "white";
      signupTab.style.background = "transparent";
      signupTab.style.color = "#6b7280";
      loginForm.style.display = "block";
      signupForm.style.display = "none";
    } else {
      signupTab.style.background = "#10b981";
      signupTab.style.color = "white";
      loginTab.style.background = "transparent";
      loginTab.style.color = "#6b7280";
      signupForm.style.display = "block";
      loginForm.style.display = "none";
    }
  }

  togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const type =
      input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
  }

  handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const rememberMe = document.getElementById("rememberMe").checked;

    // Find user
    const user = this.users.find(
      (u) =>
        (u.email === email || u.mobile === email) && u.password === password,
    );

    if (user) {
      this.currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      };

      // Save to localStorage if remember me is checked
      if (rememberMe) {
        localStorage.setItem("shopeasy_user", JSON.stringify(this.currentUser));
      }

      this.showNotification(`Welcome back, ${user.name}!`, "success");
      this.closeAuthModal();
      this.updateHeaderForLoggedInUser();
    } else {
      this.showNotification("Invalid email/mobile or password", "error");
    }
  }

  handleSignup(event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const mobile = document.getElementById("signupMobile").value;
    const password = document.getElementById("signupPassword").value;

    // Check if user already exists
    const existingUser = this.users.find(
      (u) => u.email === email || u.mobile === mobile,
    );
    if (existingUser) {
      this.showNotification(
        "User with this email or mobile already exists",
        "error",
      );
      return;
    }

    // Validate password
    if (password.length < 6) {
      this.showNotification(
        "Password must be at least 6 characters long",
        "error",
      );
      return;
    }

    // Create new user
    const newUser = {
      id: "user_" + Date.now(),
      name: name,
      email: email,
      mobile: mobile,
      password: password,
      createdAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    this.saveUsers();

    this.currentUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      mobile: newUser.mobile,
    };

    localStorage.setItem("shopeasy_user", JSON.stringify(this.currentUser));

    this.showNotification(
      `Account created successfully! Welcome, ${name}!`,
      "success",
    );
    this.closeAuthModal();
    this.updateHeaderForLoggedInUser();
  }

  socialLogin(provider) {
    this.showNotification(`${provider} login will be implemented soon`, "info");
  }

  showForgotPassword() {
    this.showNotification(
      "Forgot password feature will be implemented soon",
      "info",
    );
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem("shopeasy_user");
    this.showNotification("Logged out successfully", "success");
    this.updateHeaderForLoggedInUser();
  }

  updateHeaderForLoggedInUser() {
    const accountBtns = document.querySelectorAll(".account-btn");

    accountBtns.forEach((btn) => {
      if (this.currentUser) {
        // Update button to show user name and dropdown
        btn.innerHTML = `
          <div style="position: relative;">
            <div style="
              display: flex;
              align-items: center;
              gap: 0.5rem;
              cursor: pointer;
            " onclick="authSystem.toggleUserMenu(event)">
              <div style="
                width: 32px;
                height: 32px;
                background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                font-size: 0.9rem;
              ">
                ${this.currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div style="display: flex; flex-direction: column; align-items: start;">
                <span style="font-size: 0.8rem; color: #374151; font-weight: 600;">
                  ${this.currentUser.name.split(" ")[0]}
                </span>
                <span style="font-size: 0.75rem; color: #6b7280;">
                  Account
                </span>
              </div>
            </div>
            
            <div id="userDropdown" style="
              position: absolute;
              top: 100%;
              right: 0;
              background: white;
              border-radius: 0.75rem;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
              border: 1px solid #e5e7eb;
              min-width: 200px;
              z-index: 1000;
              display: none;
              margin-top: 0.5rem;
            ">
              <div style="padding: 1rem;">
                <div style="
                  border-bottom: 1px solid #e5e7eb;
                  padding-bottom: 0.75rem;
                  margin-bottom: 0.75rem;
                ">
                  <div style="font-weight: 600; color: #374151;">${this.currentUser.name}</div>
                  <div style="font-size: 0.8rem; color: #6b7280;">${this.currentUser.email}</div>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                  <a href="#" style="
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem;
                    color: #374151;
                    text-decoration: none;
                    border-radius: 0.5rem;
                    transition: background 0.2s;
                  " onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
                    <span>👤</span>
                    <span>My Profile</span>
                  </a>
                  <a href="#" style="
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem;
                    color: #374151;
                    text-decoration: none;
                    border-radius: 0.5rem;
                    transition: background 0.2s;
                  " onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
                    <span>📦</span>
                    <span>My Orders</span>
                  </a>
                  <a href="#" style="
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem;
                    color: #374151;
                    text-decoration: none;
                    border-radius: 0.5rem;
                    transition: background 0.2s;
                  " onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
                    <span>❤️</span>
                    <span>Wishlist</span>
                  </a>
                  <a href="#" style="
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem;
                    color: #374151;
                    text-decoration: none;
                    border-radius: 0.5rem;
                    transition: background 0.2s;
                  " onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
                    <span>⚙️</span>
                    <span>Settings</span>
                  </a>
                  
                  <div style="border-top: 1px solid #e5e7eb; margin: 0.5rem 0; padding-top: 0.5rem;">
                    <button onclick="authSystem.logout()" style="
                      display: flex;
                      align-items: center;
                      gap: 0.5rem;
                      padding: 0.5rem;
                      color: #ef4444;
                      background: none;
                      border: none;
                      border-radius: 0.5rem;
                      cursor: pointer;
                      transition: background 0.2s;
                      width: 100%;
                      text-align: left;
                    " onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='transparent'">
                      <span>🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        // Reset to login button
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span style="font-size: 12px; margin-top: 4px;">Account</span>
        `;
        btn.onclick = () => this.openAuthModal();
      }
    });
  }

  toggleUserMenu(event) {
    event.stopPropagation();
    const dropdown = document.getElementById("userDropdown");
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";

    // Close dropdown when clicking outside
    document.addEventListener(
      "click",
      () => {
        dropdown.style.display = "none";
      },
      { once: true },
    );
  }

  closeAuthModal() {
    const backdrop = document.getElementById("authModalBackdrop");
    if (backdrop) {
      backdrop.remove();
    }
  }

  addAuthStyles() {
    if (document.getElementById("authStyles")) return;

    const style = document.createElement("style");
    style.id = "authStyles";
    style.textContent = `
      @keyframes modalSlideIn {
        from { 
          opacity: 0; 
          transform: scale(0.8) translateY(100px);
        }
        to { 
          opacity: 1; 
          transform: scale(1) translateY(0);
        }
      }
      
      #authModal::-webkit-scrollbar {
        width: 6px;
      }
      
      #authModal::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 3px;
      }
      
      #authModal::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        border-radius: 3px;
      }
    `;
    document.head.appendChild(style);
  }

  showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${
        type === "success"
          ? "linear-gradient(135deg, #10b981, #059669)"
          : type === "error"
            ? "linear-gradient(135deg, #ef4444, #dc2626)"
            : "linear-gradient(135deg, #3b82f6, #1d4ed8)"
      };
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-weight: 600;
      max-width: 350px;
      animation: slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    `;

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="font-size: 1.25rem;">${
          type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"
        }</span>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideIn 0.4s ease-out reverse";
        setTimeout(() => notification.remove(), 400);
      }
    }, 4000);
  }
}

// Initialize authentication system when DOM is loaded
let authSystem;
document.addEventListener("DOMContentLoaded", function () {
  authSystem = new AuthSystem();
});

// Export for global use
window.authSystem = authSystem;
