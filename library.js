//start page

import { Note } from "./note-class.js";
import { saveToDb } from "./db.js";


export let noteArray = [];
export let rowLimitX = Math.floor((window.innerWidth - 50) / 280);

export function debugKey() {
    $(document).keydown(function (e) {
        if (e.code === "KeyQ") {
            //console.log(window.innerWidth + "px");
            console.log(noteArray);
        }
    });
}

// INITIALIZE FUNCTION
export function onPageLoad(){
    console.log('on page load firing');
}

// NEW NOTE FUNCTION
export function newNote(text) {
    //this is all happening in the note class constructor now.
    new Note(text);
}

// NEW ROW FUNCTIOM
export function newRow() {
    $(".active-row").removeClass("active-row");
    $(".notes-cont").append(`<div class='row active-row'></div>`);
    addNewNoteFloat();
}

// SAVE FUNCTION
export function saveAll() {
    console.log("saving...");

    //saving each item in the array as the thing that it is
    for (let i = 0; i < noteArray.length; i++) {
        noteArray[i].text = $(".notes-cont").find(".note-textarea").eq(i).val();
    }
    //send that array to saveToDB() in db.js
    saveToDb(noteArray);
}

//BUILD NOTES FUNTION
//coming in from loadFromDb() in db.js
export function buildNewNotes(data) {
    //console.log("build button wee woo");
    //console.log(data);
    //console.log(data.notesObj[0].text);
    //console.log(Object.keys(data.notesObj).length);

    for (let i = 0; i < Object.keys(data.notesObj).length; i++) {
        newNote(data.notesObj[i].text);
    }
}

// we'll call you *refresh* NOTES FUNCTION
export function refreshNotes(array){
    console.log('wiping all notes');
    $(".row .note").not(".active-row").remove();

    //build them again based off of whats in the array...
    console.log(array);
    rebuildNotes(array);
}

function rebuildNotes(array){
    //rebuild from the array without loading everything new - this way we don't call New Note 100 times and blow up the array

    for (let i = 0; i < array.length; i++) {
        let him = array[i];
        him.build(him.text, him.id);
        
        $(`#trash-button-${i}`).click(function (e) {
            let handlerIndex = e.target.id.slice(-1);
            noteArray[handlerIndex].delete();
        });
    }

}

export function addNewNoteFloat(){
    
    const localFloatIcon = `<button><i class="fa fa-plus-square"></i></button>`;
    const localFloatDiv = `<div class='new-note-float'>${localFloatIcon}</div>`;

    $(".active-row").append(localFloatDiv);
    $(".new-note-float i, .new-note-float").css('cursor', 'pointer');
    $(".new-note-float").click(function(e){
        console.log('new note float!!!');
        newNote();
    })
    

}

//LOGGED IN AND OUT SCREENS
export function loggedOut(){
    console.log('user is signed out');
    console.log('deleting all notes');
    $(".row .note").not(".active-row").remove();
    $(".notes-cont").hide();
    $(".logged-out-cont").show();
    //delete all notes, hide the div
    // show new div with stuff... maybe instructions, a picture of me? whatever.
}

export function loggedIn(user){
    console.log('user is logged in');
    console.log(user.uid);
    console.log(user.email);
    $(".row .note").not(".active-row").remove();
    $(".notes-cont").show();
    $(".logged-out-cont").hide();
}

//MODALS
export function launchModal(modal){
    console.log(modal + "!");
    fadeInModal(modal);

    $(window).click(function (e) {
        let classList = Object.values(e.target.classList);
        if(classList.includes("modal"))exitModal();
    });
    $(".modal-content span").click(function (e) {
        exitModal();
    })

}

function fadeInModal(modal){
    $(modal).show();
    $(".modal").css("opacity", "0");
    $(".modal").animate({opacity: '1'},"0.5s");
    $(".modal-content").animate({margin: '15% auto'},"0.5s");
}
export function exitModal(modal){
    $(".modal").hide();
    $(".modal").css("opacity", "0");
    $(".modal-content").css("margin", "0 auto");

}