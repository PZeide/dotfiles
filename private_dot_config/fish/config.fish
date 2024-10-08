set -gx fish_greeting ""
set -gx EDITOR "nvim"
set -gx VISUAL "nvim"
set -gx SSH_AUTH_SOCK "$XDG_RUNTIME_DIR/gcr/ssh"
set -gx DOCKER_HOST "unix://$XDG_RUNTIME_DIR/docker.sock"
set -gx WALLPAPER_PATH $(readlink -f ~/.config/hypr/wallpapers/current_wallpaper)

alias g="git"
alias n="nvim"
alias vimdiff="nvim -d"

if not set -q TERM_PROGRAM; and set -q DISPLAY; and status --is-interactive
	fastfetch
end
