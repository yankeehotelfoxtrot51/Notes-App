//start page

import { newRow, debugKey, saveAll, launchModal, mobileDropDown, saveTimer, noteArray } from "./library.js";
import { } from "./db.js";
import { logout } from "./auth.js";

console.log(" manin .js tbg is starting the app...");

newRow();

//EVENT LISTENERS
    debugKey();

    $("#save-button").click(function (e) {
        e.preventDefault();
        saveAll();
    });

    $("#mobile-menu").click(function (e) {
        mobileDropDown();
    });

    $(".note-textarea").change(function (e){
        e.preventDefault();
        console.log('keyup!');
    });

    //MODAL EVENT LISTENERS
        $("#sign-up h2, #mobile-sign-up").click(function (e) {
            launchModal("#sign-up-modal");
        })

        $("#log-in h2, #mobile-log-in").click(function (e) {
            console.log('log in!');
            launchModal("#log-in-modal");
        })

        $("#log-out h2, #mobile-log-out").click(function (e) {
            console.log('log out!');
            logout();
        })

        $("#user-info i").click(function (e) {
            console.log('user info!');
            launchModal("#user-info-modal");
        })


        //BUGS THAT I'M FINDING
        //
        // for some reason sometimes when you type on a note it doesn't auto save... could be only on new notes? not sure...
        // ^^^ unsure,,, but it did happen. make sure that it does something if it can't save, or if it takes too long to save...