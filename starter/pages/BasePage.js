class BasePage {
    static get generalLocators() {
        return {
            containerSnackBarError: by.css('.error-snackbar'),
            containerSnackBarInfo: by.css('.mat-snack-bar-container'),
            itemDataTableCell: by.css('.adf-datatable-cell'),
            itemDataTableImgCenter: by.css('.adf-datatable-center-img-ie'),
            itemDataTableSelected: by.css('.adf-datatable-selected'),
            itemTagSpan: by.tagName('span'),
        }
    }

    constructor() {
        this.basicLocators = BasePage.generalLocators;
    }

    /**
     * Assert error is displayed
     * @param {String} error - text error
     */
    assertSnackBarError(error) {
        const errorElem = element(this.basicLocators.containerSnackBarError);
        expect(errorElem.element(this.basicLocators.itemTagSpan).getText()).toEqual(error);

        return this;
    }

    /**
     * Assert snack bar info is displayed
     * @param {String} info - text info
     */
    assertSnackBarInfo(info) {
        const infoElem = element(this.basicLocators.containerSnackBarInfo);
        expect(infoElem.element(this.basicLocators.itemTagSpan).getText()).toEqual(info);

        return this;
    }

    /**
     * Perform click on web element
     */
    clickElement(webElement) {
        browser.wait(EC.visibilityOf(webElement), 5000, "Web element with locator" + webElement.locator() + "is not visible");
        browser.wait(EC.elementToBeClickable(webElement), 5000, "Web element with locator" + webElement.locator() + "is not clickable");
        webElement.click();

        return this;
    }

    /**
     * Set value in input element
     * @param webElement - input web element
     * @param option - option text
     */
    setInputValue(webElement, option) {
        browser.wait(EC.visibilityOf(webElement), 5000, "Web element with locator" + webElement.locator() + "is not visible");
        webElement.click();
        webElement.clear();
        webElement.sendKeys(option);

        return this;
    }
}

export default BasePage;