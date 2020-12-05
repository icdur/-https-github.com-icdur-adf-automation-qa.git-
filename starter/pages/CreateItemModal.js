import BasePage from './BasePage';
import PersonalFilesPage from './PersonalFIlesPage';

class CreateItemModal extends BasePage {
    constructor() {
        super();

        this.locators = {
            btnCancel: by.id('adf-folder-cancel-button'),
            btnCreateFolder: by.id('adf-folder-create-button'),
            containerFolderModal: by.tagName('adf-folder-dialog'),
            inputFolderDescription: by.id('adf-folder-description-input'),
            inputFolderName: by.id('adf-folder-name-input'),
        };
    }

    /**
     * Wait for creation modal to not be closed
     */
    assertCreationModalIsNotClosed() {
        expect(element(this.locators.containerFolderModal).isDisplayed()).toEqual(true);
        expect(element(this.locators.inputFolderName).isDisplayed()).toEqual(true);
        expect(element(this.locators.inputFolderDescription).isDisplayed()).toEqual(true);

        return this;
    }

    /**
     * Assert folder name
     * @param {String} name - folder name
     */
    assertFolderName(name) {
        expect(element(this.locators.inputFolderName).getAttribute('value')).toEqual(name);

        return this;
    }

    /**
     * Set new folder name
     * @param {String} name - folder name
     */
    setFolderName(name) {
        this
            .setInputValue(element(this.locators.inputFolderName), name);

        return this;
    }

    /**
     * Set new folder description
     * @param {String} description - folder description
     */
    setFolderDescription(description) {
        this
            .setInputValue(element(this.locators.inputFolderDescription), description);

        return this;
    }

    /**
     * Click cancel to close new folder modal
     */
    cancel() {
        this
            .clickElement(element(this.locators.btnCancel));

        return this;
    }

    /**
     * Click create to save new folder details
     */
    create() {
        this
            .clickElement(element(this.locators.btnCreateFolder));

        return this;
    }

    /**
     * Wait for creation modal to be closed
     */
    waitForCreationModalToBeClosed() {
        browser.wait(EC.invisibilityOf(element(this.locators.containerFolderModal)), 5000);

        return new PersonalFilesPage();
    }

    /**
     * Save new folder with following details
     * @param name - folder name
     * @param description - folder description
     */
    saveNewFolder(name, description) {
        return this
            .setFolderName(name)
            .setFolderDescription(description)
            .create()
            .waitForCreationModalToBeClosed();
    }

}

export default CreateItemModal;
