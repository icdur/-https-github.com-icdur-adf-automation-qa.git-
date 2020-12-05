import BasePage from './BasePage';
import PersonalFilesPage from './PersonalFIlesPage';

class LoginPage extends BasePage {
    constructor() {
        super();

        this.locators = {
            inputUsername: by.css('[data-automation-id="username"]'),
            inputPassword: by.css('[data-automation-id="password"]'),
            btnSignIn: by.css('[data-automation-id="login-button"]'),
        };
        this.url = 'https://4ovcw1kj.trials.alfresco.com/'
    }

    /**
     * Perform login to alfresco app
     * @param {String} user
     * @param {String} password
     */
    login(user, password) {
        this
            .setInputValue(element(this.locators.inputUsername), user)
            .setInputValue(element(this.locators.inputPassword), password)
            .clickElement(element(this.locators.btnSignIn));

        return new PersonalFilesPage();
    }

    /**
     * Open sign in page
     */
    visit() {
        browser.get(this.url);

        return this;
    }
}

export default LoginPage;
