import BasePage from './BasePage';
import CreateItemModal from './CreateItemModal';

class PersonalFilesPage extends BasePage {
    constructor() {
        super();

        this.locators = {
            btnCreateNew: by.css('[data-automation-id="create-button"]'),
            btnDelete: by.id('app.context.menu.delete'),
            containerFolderListBody: by.css('.adf-datatable-body'),
            containerFolderRow: by.css('.adf-datatable-row'),
            dropdownOptionCreateFolder: by.id('app.create.folder'),
            labelFolderName: by.css('[data-automation-id="adf-name-column"]')
        };
        this.url = 'https://4ovcw1kj.trials.alfresco.com/#/personal-files'
    }

    /**
     * Assert folder is displayed in list
     * @param {String} name - folder name
     */
    assertFolderIsDisplayedInlist(name) {
        this.getFolderRowFromList(name)
            .then((folderContainer) => {
                expect(folderContainer).not.toEqual(undefined);
            });

        return this;
    }

    /**
     * Assert folder is not displayed in list
     * @param {String} name - folder name
     */
    assertFolderIsNotDisplayedInlist(name) {
        element(this.locators.labelFolderName).isPresent()
            .then((folderPresent) => {
                if(folderPresent){
                    this.getFolderRowFromList(name)
                        .then((folderContainer) => {
                            expect(folderContainer).toEqual(undefined);
                        });
                } else {
                    expect(folderPresent).toEqual(false);
                }
            });

        return this;
    }

    /**
     * Create new folder
     */
    createNewFolder() {
        this
            .newItem()
            .clickElement(element(this.locators.dropdownOptionCreateFolder));

        return new CreateItemModal();
    }

    /**
     * Delete folder
     * @param {String} name - folder name
     */
    deleteFolder(name) {
        this
            .openFolderOptions(name)
            .clickElement(element(this.locators.btnDelete));
        browser.wait(EC.invisibilityOf(element(this.locators.btnDelete)), 3000);

        return this;
    }

    /**
     * Get folder row from folders list
     * @param {String} name - folder name
     */
    getFolderRowFromList(name) {
        const locators = this.locators;
        return element(this.locators.containerFolderListBody).all(this.locators.containerFolderRow)
            .filter(function (elemRepeater) {
                return elemRepeater.element(locators.labelFolderName).getText()
                    .then(function (folderNameText) {
                        return folderNameText === name;
                    })
            })
            .then(function (elemArray) {
                return elemArray[0]
            })
    };

    /**
     * Open create new item dropdown
     */
    newItem() {
        this
            .clickElement(element(this.locators.btnCreateNew));

        return this;
    }

    /**
     * Select folder from list and press right click on item
     * @param {String} name - folder name
     */
    openFolderOptions(name) {
        this
            .getFolderRowFromList(name)
            .then((folderElement) => {
                folderElement
                    .element(this.basicLocators.itemDataTableImgCenter)
                    .click();
                browser.wait(EC.visibilityOf(folderElement.element(this.basicLocators.itemDataTableSelected)), 5000);
                browser.actions()
                    .click(folderElement, protractor.Button.RIGHT)
                    .perform();
            });

        return this;
    }

    /**
     * Open personal files page
     */
    visit() {
        browser.get(this.url);

        return this;
    }
}

export default PersonalFilesPage;
