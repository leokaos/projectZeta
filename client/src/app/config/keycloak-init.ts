import { KeycloakOptions, KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment"

export function initializer(keycloack: KeycloakService) {

    const options: KeycloakOptions = {
        config: environment.keycloakConfig,
        initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: true
        }
    };

    return () => keycloack.init(options);
}