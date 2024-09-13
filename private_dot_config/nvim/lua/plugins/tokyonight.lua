return {
  "folke/tokyonight.nvim",
  lazy = false,
  priority = 1000,
  opts = {
    style = "storm",
    transparent = true,
    styles = {
      sidebars = "transparent",
      floats = "transparent"
    },
    lualine_bold = true
  },
  init = function ()
    vim.cmd[[colorscheme tokyonight-storm]]
  end
}
