using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.NetworkInformation;
using System.Text.Json;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace Login.Api
{
    public class FacebookTokenHandler
    {
        private static readonly DateTime epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        private static DateTime _now => DateTime.UtcNow;
        private static string _appAccessToken = string.Empty;

        private static Dictionary<string, AccessTokenInfo> _tokenCache = new Dictionary<string, AccessTokenInfo>();

        private static string _facebookAppId = "732651050902124";
        private static string _facebookAppSecret = "a54281a0f98102b975c3838494562d46";

        private static readonly HttpClient _client = new HttpClient();

        public static string GetUserIdByAccessToken(string accessToken)
        {
            if (!string.IsNullOrEmpty(accessToken) && _tokenCache.ContainsKey(accessToken))
            {
                return _tokenCache[accessToken].UserId;
            }
            else
            {
                return null;
            }
        }

        public static async Task<bool> IsValidToken(string accessToken)
        {
            if (string.IsNullOrEmpty(accessToken))
            {
                return false;
            }

            if (_tokenCache.ContainsKey(accessToken) && _tokenCache[accessToken].ExpiresAt > _now)
            {
                return true;
            }
            else
            {
                var appAccessToken = await GetAppAccessToken();
                var accessTokenInfo = await ValidateAccessToken(accessToken);

                ValidateAccessTokenInfo(accessTokenInfo);

                if (!accessTokenInfo.IsValid || accessTokenInfo.ExpiresAt < _now)
                {
                    return false;
                }

                _tokenCache[accessToken] = accessTokenInfo;

                return true;
            }
        }

        private static void ValidateAccessTokenInfo(AccessTokenInfo accessTokenInfo)
        {
            
        }

        private static async Task<string> GetAppAccessToken()
        {
            var query = string.Format(
                @"https://graph.facebook.com/oauth/access_token?client_id={0}&client_secret={1}&grant_type=client_credentials",
                _facebookAppId, _facebookAppSecret);

            var appResp = await _client.GetAsync(query);
            var respString = await appResp.Content.ReadAsStringAsync();
            
            var resp = JObject.Parse(respString);

            _appAccessToken = (string)resp["access_token"];
            return _appAccessToken;
        }

        private static async Task<AccessTokenInfo> ValidateAccessToken(string input_token)
        {
            var query = string.Format(
                @"https://graph.facebook.com/debug_token?input_token={0}&access_token={1}",
                input_token, _appAccessToken);

            var appResp = await _client.GetAsync(query);
            var respString = await appResp.Content.ReadAsStringAsync();

            var resp = JObject.Parse(respString);
            var ati = new AccessTokenInfo(resp);

            return ati;
        }


        private class AccessTokenInfo
        {
            public AccessTokenInfo(JObject o)
            {
                AppId = (string) o["data"]["app_id"];
                ExpiresAt = FromUnixTime((long)o["data"]["expires_at"]);
                IsValid = (bool)o["data"]["is_valid"];
                if (!IsValid)
                {
                    ErrorMessage = (string) o["data"]["error"]["message"];
                }
                UserId = (string)o["data"]["user_id"];
            }

            public string AppId { get;  }
            public DateTime ExpiresAt { get;  }
            public bool IsValid { get;  }
            public string ErrorMessage { get;  }
            public string UserId { get;  }

            private static DateTime FromUnixTime(long unixTime)
            {
                return epoch.AddSeconds(unixTime);
            }
        }
    }
}
