// spec.js
import LoginPage from "./pages/LoginPage";
import PersonalFilesPage from "./pages/PersonalFIlesPage";

describe('ADF Demo App', function () {
    let loginPage = new LoginPage();
    let personalFilesPage = new PersonalFilesPage();
    const folderName = 'icdur';

    it('create and delete personal folder', function () {
        loginPage.visit()
            .login('guest@example.com', 'Password');
        personalFilesPage
            .createNewFolder()
            .setFolderName(folderName)
            .assertFolderName(folderName)
            .create()
            .waitForCreationModalToBeClosed()
            .assertFolderIsDisplayedInlist(folderName);

        personalFilesPage
            .createNewFolder()
            .setFolderName(folderName)
            .assertFolderName(folderName)
            .create()
            .assertCreationModalIsNotClosed()
            .assertSnackBarError('There\'s already a folder with this name. Try a different name.')
            .cancel()
            .waitForCreationModalToBeClosed();

        personalFilesPage
            .deleteFolder(folderName)
            .assertFolderIsNotDisplayedInlist(folderName);
    });

});