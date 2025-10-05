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
         FIREBASE_SERVICE_ACCOUNT_KEY="ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAic3R1ZGlvLTg0NTYyNzIxMC1jMWM0ZiIsCiAgInByaXZhdGVfa2V5X2lkIjogIjE3NTIwOWU5NTBiMTg0MmI0NmYyY2Y0ZjA3NDQ4MWNiMWU3ZDk0YyIsCiAgInByaXZhdGVfa2V5IjogIi0tLS0tQkVHSU4gUFJJVkFURSBLRVktLS0tLVxuTUlJRSvRVFJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLY3dnZ1NqQWdFQUFvSUJBUUR6Nm9YTGNtc0F3SEdtXG5PWGROUWlwSXRYeUJGa0kvTVBiSmxYZWF2Y1NPUVNVUi9BcjB6emtSU0U3T3g4d1RQbEd3TjFBak0xWC9JZ1IyXG5LZ3gweWx0SUdHUjZJMTFxaVJSMzBCMnZ0M2V3SGlRcENuME9YbG02TkpNRVlaVXBRYk1naUdlVC9lSFQ0RzkwXG5LMUtRT3VBUi8yck8vcHBQRVhTcUZNc0pXS3lUYXVtWUJIVDBHYVBGQUYrT042VGMzN1FoZ2FOK0EyUW91cm4vXG5EWmw2OHFWQ2hGckhGQTVqUFVtdWFjTksyNDk0RE9HNVRXdTd2RVI4ZzY2SUQ5MVFrN0NsV0pyeFpuNDVvQndWXG5MZVF0L01vYzN0a0dGTFNhNVNWNVBRcnVQeTN6WldMaDZaSXZhMHhtTURPTGRSeUtDZHFEdkxZbDhEYUxqNVd1XG5oUkFKRDlIYkFnTUJBQUVDZ2dFQWJDUU9MYVVNeThpR21xdmZ1T0VjM2grWWs2TEt2RGw1TU9hVG9JZUNIWS9FXG5YN1RmSnFxNUluQnNnRUVVdVhObnhEakJ6dGx6eHluTjBKWFQ3L1BIaEs5TDNOclJEK3EycUdnY3dVc1dSWDhYXG5pUnFkVjBGOWhwREluYWlsK1NTbmhrc1pwMmxvTmdmTFlqWFM1UjgxT01XRkZVRE1LVUlUOTFSQXNHUWdIenJwXG53ZW4veWhVWTlXVE9OUDVyQXBHNFRKMTJiSkxLR1BzeGJBQTJBN3dBZS9rN1I3OGpvMnNTZW1yL3pmcGpXZW9WXG5vejRSQmFNY3RJbWQzczk0NmE1cjMyRGRtZVk4dUlpNWhnN1hXVzZTa2ZUcVpoL2FDUnJyM29UWE5rL3A4OTR4XG41RWwzQ0RTbURzdTQ2YjRoMUtweHdVRlFpV2ZXVFRDdlpCNndaOVpRQVFLQmdRRDZnRDdTaTVBTjJOVzRZZzNLXG5WOFkxMFVLUWhGTVRzQmtaOGF1OTdYQ0JmTTZFZzNnckYvNTA0R1lFUzZvdlNvSUtMYUxCSmZxWklLeGpubnVjXG4zaWdXYkVlcXE3S0tEcm54UFJpQ1pnNXJNd2RnTHdINUdXWW52ZUFBSlVscVFtckNkL2QxNDRzMk1vK3NvbUFjXG5pOWJhYU5ZcXM1TnlYQ1JxSHFpVXRqOHBTd0tCZ1FENVJVV2VrUFBaZnN0VGZkQjZwdllEcjFtTXJ5MERaZm9QXG42eHpEMWM3S0w4WkVOaEFFUWhnRFJyVGFzRTBpaVZYN2hDbWtXWWE1UDA4OGRaVzcvd3I5Vi9lWE9kUGxQRlRQXG5YYVlLQm5naUFwWVlMZEhpbmNtRkhyMk9OZ0hpcTlVVC9KZzJwSlUvVlpXKzA3dk9OTWwvdUZZSkdNWHVrcGx3XG5LKzVZVGo2dnNRS0JnRE1TeHJ4Q3ZFSTJmWXkwWVQ5cUdmMkxCdGxVUVdQNE9ZWHlvaU45TDcwVzV6eFpXYnpmXG5qWC9pNktuamkzVk02YXFObDJ0dUJPUUhwMTVBUjgrNTg4NXVrVVlZNzdQNlFLc1EyOWhxV25JODJ6b2ZHM1hnXG5XZFdzZnVsSXNPazdWVzBFN0sxYWtWMmhmVzJqUlpsTVlhZnlUQWcweU5FK1BDWnV6Y3hVUkJoMUFvR0FKUGRmXG43cmNDWXJQS0JYUzRFU2huZlg1b29sTnNNbi9TQ01CT1FNQ1piU1NPbTVrSFFIcG93enVlSUh4YXhBOW4zK2ZtXG5vUWZoMGVFUXFCK3I5L2hIc2ZCMHVFbU1JZ2ZEY0Frc1VYcEtJSWtQcDBCTVN2WXBaNE42aXZkNWFoc2ZlMXBQXG5YSE1sNndHUE5vQ0I3bituampoUkVnSkpnQ3JmZEdJZmM1c084dEVDZ1lFQTM4RUgvRmNsczBWc0pyd0lmVGJjXG4wQk16WHI5eENWV3pvVGVtb2ViSjNDWG1scW5zL1JOajFqMFkxU200SzBSZ2plSnBXYVAxaE1SQVpBWTFib09xXG5pbzdBajM1QldCWmZ0MWVhMGNVaFV1TTNNM2d5VHF3RXVpSmx6Und2emdlSlFCY21uRnQyczQweGRmOVd4NW1aXG5NcDVxTEhkbG5tVkE5UG54N0VnT0tZQT1cbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cbiIsCiAgImNsaWVudF9lbWFpbCI6ICJmaXJlYmFzZS1hZG1pbnNkay1mYnN2Y0BzdHVkaW8tODQ1NjgyNzIxMC1jMWM0Zi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsCiAgImNsaWVudF9pZCI6ICIxMTgzNjcxODIwNjQxMjQ1MDc1NzkiLAogICJhdXRoX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCIsCiAgInRva2VuX3VyaSI6ICJodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlbiIsCiAgImF1dGhfcHJvdmlkZXJfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL2FwaXMuZ29vZ2xlY29tL28vb2F1dGwyL3YxL2NlcnRzIiwKICAiY2xpZW50X3g1MDlfY2VydF91cmwiOiAiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vcm9ib3QvdjEvbWV0YWRhdGEveDUwOS9maXJlYmFzZS1hZG1pbnNkay1mYnN2YyU0MHN0dWRpby04NDU2ODcyMTAtYzFjNGYuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLAogICJ1bml2ZXJzZV9kb21haW4iOiAiZ29vZ2xlYXBpcy5jb20iCn0K%";
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
