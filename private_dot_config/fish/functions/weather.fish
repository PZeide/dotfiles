function weather -d "Get weather message from current IP address"
  argparse "h/help" "n/no-cache" -- $argv

  if set -q _flag_help
    _weather_help
  else
    set cache_file "$HOME/.cache/weather_data"

    set parent_dir $(dirname "$cache_file")
    if not test -d "$parent_dir"
      mkdir -p "$parent_dir"
    end

    if not set -q _flag_n; and test -e "$cache_file"
      set last_modified $(stat -c %Y "$cache_file")
      set current $(date +%s)
      set time_diff $(math $current - $last_modified)

      if test $time_diff -lt 600 # Refresh every 10 minutes
        cat "$cache_file"
        return 0
      end
    end

    # At this point, cache is either non-existent, expired or flag no-cache is set
    set api_result $(curl -sf --ipv4 "https://wttr.in/?format=%c+%C+%t")
    if test $status -ne 0 # Check if request failed
      printf "failed to reach api"
      return 1
    end

    # Remove any multiple spaces (usually after emoji)
    set clean_api_result $(echo "$api_result" | tr -s " ")

    if not set -q _flag_n
      echo "$clean_api_result" > "$cache_file"
    end

    echo $clean_api_result
  end
end

function _weather_help
  printf %s\n \
    "Usage: weather [options]" \
    "" \
    "Options:" \
    "  -h or --help      print this help message" \
    "  -n or --no-cache  disable cache (force remote querying and don't save to cache)"
end
