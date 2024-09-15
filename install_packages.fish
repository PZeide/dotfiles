#!/bin/fish

if not type -q yay
  echo "yay is not installed!"
  return 1
end

cat packages | read -za packages
