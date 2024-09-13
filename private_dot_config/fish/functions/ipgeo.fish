function ipgeo -d "Get geo data from current IP address"
  argparse "h/help" "n/no-cache" -- $argv

  if set -q _flag_help
    _ipgeo_help
  else if functions --query _ipgeo_query_$argv[1]
    set cache_file "$HOME/.cache/ipgeo_data"

    # Create parent directory
    set parent_dir $(dirname "$cache_file")
    if not test -d "$parent_dir"
      mkdir -p "$parent_dir"
    end

    if not set -q _flag_n; and test -e "$cache_file"
      set last_modified $(stat -c %Y "$cache_file")
      set current $(date +%s)
      set time_diff $(math $current - $last_modified)

      if test $time_diff -lt 3600 # Refresh every hour
        read cache_data < "$cache_file"
        _ipgeo_query_$argv[1] "$cache_data"
        return 0
      end
    end

    # At this point, cache is either non-existent, expired or flag no-cache is set
    set api_result $(curl -sf --ipv4 https://ipapi.co/json) # On my end, ipv4 is more precise than ipv6 for geo
    if test $status -ne 0 # Check if request failed
      printf "failed to reach api"
      return 1
    end

    # Store cache only if no-cache is not set
    if not set -q _flag_n
      echo "$api_result" | jq -c > "$cache_file"
    end

    _ipgeo_query_$argv[1] "$api_result"
  else
    _ipgeo_help
    return 1
  end
end

function _ipgeo_help
  printf %s\n \
    "Usage: ipgeo subcommand [options]" \
    "" \
    "Options:" \
    "  -h or --help      print this help message" \
    "  -n or --no-cache  disable cache (force remote querying and don't save to cache)" \
    "" \
    "Subcommands:" \
    "  city          query city" \
    "  country       query country" \
    "  country_code  query country code" \
    "  lat_lon       query latitude and longitude (separated by space)" \
    "  timezone      query timezone"
end

function _ipgeo_query_city
  echo "$argv[1]" | jq -r ".city" 2> /dev/null
end

function _ipgeo_query_country
  echo "$argv[1]" | jq -r ".country_name" 2> /dev/null
end

function _ipgeo_query_country_code
  echo "$argv[1]" | jq -r ".country_code" 2> /dev/null
end

function _ipgeo_query_lat_lon
  echo "$argv[1]" | jq -r "\"\(.latitude) \(.longitude)\"" 2> /dev/null
end

function _ipgeo_query_timezone
  echo "$argv[1]" | jq -r ".timezone" 2> /dev/null
end
