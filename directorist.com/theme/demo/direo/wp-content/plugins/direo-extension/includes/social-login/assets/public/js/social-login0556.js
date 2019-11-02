// -------------------------------------
// APP
// -------------------------------------
var app = {
    facebook: {
        api: atbdp_social_login_obj.fb_app_id,
        hasValidApi: null,
        isLoading: false,
        elm: {
            loading: jQuery('.azbdp-fb-loading')
        }
    },

    google: {
        api: atbdp_social_login_obj.google_api,
        hasValidApi: null,
        isLoading: false,
        elm: {
            loading: jQuery('.azbdp-gg-loading')
        }
    },

    // loginToFacebook
    loginToFacebook: function () {
        if (typeof FB === "undefined" || !this.facebook.api.length) {
            this.showStatus(0);
            return;
        }
        var that = this;
        this.isLoading('facebook', 1);

        FB.login(function (response) {
            // console.log(response);
            that.facebookLoginCallback(response);
        }, {scope: "public_profile,email"});
    },

    // facebookLoginCallback
    facebookLoginCallback: function (response) {
        if (response.status === "connected") {
            // console.log("Login Successful");
            var that = this;

            FB.api("/me?fields=id,name,first_name,last_name,email,picture.type(large)", function (userData) {
                if (!userData) {
                    that.showStatus(0);
                    return;
                }

                var data = {
                    id: userData.id,
                    full_name: userData.name,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    email: userData.email,
                    profile_picture: userData.picture.data.url
                };
                that.sendLoginRequest(data);
            });
        } else {
            // console.log("Login Failed");
            // this.showStatus(0);
            this.isLoading('facebook', 0);
        }
    },

    // loginToGoogle
    loginToGoogle: function () {
        if (typeof gapi === "undefined" || !this.google.hasValidApi) {
            this.showStatus(0);
            return;
        }
        var googleAuth = gapi.auth2.getAuthInstance();
        if (!googleAuth) {
            this.showStatus(0);
            return;
        }
        this.isLoading('google', 1);
        var that = this;

        googleAuth
            .signIn({scope: "profile email"})
            .then(function (response) {
                // console.log("Sign in successful");
                var currentUser = googleAuth.currentUser.get();
                var profile = currentUser.getBasicProfile();

                var data = {
                    id: profile.getId(),
                    full_name: profile.getName(),
                    first_name: profile.getGivenName(),
                    last_name: profile.getFamilyName(),
                    email: profile.getEmail(),
                    profile_picture: profile.getImageUrl()
                };

                that.sendLoginRequest(data);
            })
            .catch(function (error) {
                // console.log("Sign in failed");
                that.isLoading('google', 0);
            });
    },

    // sendLoginRequest
    sendLoginRequest: function (data) {
        var that = this;
        var formData = {
            action: "atbdp_social_login",
            id: data.id,
            email: data.email,
            full_name: data.full_name,
            first_name: data.first_name,
            last_name: data.last_name,
        };

        jQuery.ajax({
            type: "post",
            dataType: "json",
            url: atbdp_social_login_obj.ajax_url,
            data: formData,
            success: function (response) {
                if (response.status) {
                    that.showStatus(1);
                    window.location.href = response.redirect_url;
                } else {
                    that.showStatus(0);
                    that.isLoading('facebook', 0);
                    that.isLoading('google', 0);
                }
                console.log(response);
            },
            error: function (error) {
                that.showStatus(0);
                that.isLoading('facebook', 0);
                that.isLoading('google', 0);
                console.log(error);
            }
        });
    },

    showStatus: function (status_type) {
        if (status_type) {
            jQuery('p.status').html('<span class="status-success">' + atbdp_social_login_obj.success_msg + '</span>');
        } else {
            jQuery('p.status').html('<span class="status-failed">' + atbdp_social_login_obj.error_msg + '</span>');
        }
    },

    isLoading: function(type, status) {
        if ( !this[type] ) { return; }

        if (  status ) {
            this[type].elm.loading.addClass('azbdp--show');
            return;
        }

        this[type].elm.loading.removeClass('azbdp--show');
    }

};


// -------------------------------------
// Facebook Signin
// -------------------------------------
// Connect to Facebook API if API key is present
if (app.facebook.api.length > 0) {
    window.fbAsyncInit = function () {
        if (typeof FB === "undefined") { return; }
        FB.init({
            appId: app.facebook.api,
            status: false,
            cookie: true,
            xfbml: true,
            version: "v4.0"
        });
    };
} else {
    jQuery(".az-fb-login-btn").remove();
}

// Login to Facebook on click on button
jQuery(".az-fb-login-btn").on("click", function (e) {
    e.preventDefault();
    app.loginToFacebook();
});


// -------------------------------------
// Google Signin
// -------------------------------------
// Connect to Google API if API key is present
function initGAPI() {
    if (!app.google.api.length) {
        jQuery(".az-gg-login-btn").remove();
        return;
    }
    gapi.load("auth2", function () {
        gapi.auth2.init({
            client_id: app.google.api
        })
            .then(function (response) {
                // console.log('Google API Success');
                app.google.hasValidApi = true;
                // console.log(response);
            })
            .catch(function (error) {
                console.log('Google API Error');
                app.google.hasValidApi = false;
                // console.log(error);
            });
    });
}

// Login to Google on click on button
jQuery(".az-gg-login-btn").on("click", function (e) {
    e.preventDefault();
    app.loginToGoogle();
});
