local g = vim.g
local opt = vim.opt

-- [[ Global configuration ]]

g.mapleader = " "
g.maplocalleader = " "

-- [[ NeoVim configuration ]]

opt.encoding = "utf-8"
opt.fileencoding = "utf-8"

opt.mouse = "a"
opt.clipboard = "unnamedplus"
opt.shell = "fish"

opt.number = true
opt.cursorline = true
opt.showmatch = true
opt.splitright = true
opt.splitbelow = true
opt.ignorecase = true
opt.smartcase = true
opt.linebreak = true
opt.termguicolors = true
opt.laststatus = 3

opt.expandtab = true
opt.shiftwidth = 2
opt.tabstop = 2
opt.smartindent = true
opt.breakindent = true

opt.hidden = true
opt.lazyredraw = true
