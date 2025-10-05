# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{pkgs}: {
  # Which nixpkgs channel to use.
  channel = "stable-24.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.zulu
  ];
  # Sets environment variables in the workspace
       env = {
         FIREBASE_API_KEY="AIzaSyDwVVHlJdGElJ4i5QUytYLiKAsWAjYwxU0";
         FIREBASE_AUTH_DOMAIN="studio-8456827210-c1c4f.firebaseapp.com";
         FIREBASE_PROJECT_ID="studio-8456827210-c1c4f";
         FIREBASE_STORAGE_BUCKET="studio-8456827210-c1c4f.firebasestorage.app";
         FIREBASE_MESSAGING_SENDER_ID="274766777922";
         FIREBASE_APP_ID="1:274766777922:web:1d582eb7ae673eca90a7db";
         GEMINI_API_KEY="AIzaSyCgS1Vk2RDTG36IG3E1OWnv2v5Vhykxhi4";
         FIREBASE_DATABASE_URL="https://studio-8456827210-c1c4f.firebaseio.com";
    };

  # This adds a file watcher to startup the firebase emulators. The emulators will only start if
  # a firebase.json file is written into the user's directory
  services.firebase.emulators = {
    # Disabling because we are using prod backends right now
    detect = false;
    projectId = "demo-app";
    services = ["auth" "firestore"];
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];
    workspace = {
      onCreate = {
        default.openFiles = [
          "src/app/page.tsx"
        ];
      };
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
