    //Function to show default Modal 
    function showModal(event) {
        var eventTarget = event.target;
        var eventTrigger = eventTarget.parentNode;
        console.log(eventTrigger);
        var mymodal = $('#myModal');
        // console.log(thisa.dataset.alliance);
        mymodal.find('#modaltitle').text(eventTrigger.dataset.name);
        mymodal.find('#imagemodal').attr('src', eventTrigger.dataset.image);
        mymodal.find('#type').text(eventTrigger.dataset.genre);
        mymodal.find('#habitat').text(eventTrigger.dataset.habitat);
        mymodal.find('#group').text(eventTrigger.dataset.group);
        mymodal.find('#description').text(eventTrigger.dataset.description);
        mymodal.modal('show');
    }


//Array with pokemon images
const imagePokemon = {
    blastoise: "../assets/images/blastoise.png",
    ivysaur: "../assets/images/ivysaur.png",
    bulbasaur: "../assets/images/bulbasaur.png",
    caterpie: "../assets/images/caterpie.png",
    charizard: "../assets/images/charizard.png",
    charmeleon: "../assets/images/charmeleon.png",
    charmander: "../assets/images/charmander.png",
    squirtle: "../assets/images/squirtle.png",
    wartortle: "../assets/images/wartortle.png",
    venusaur: "../assets/images/venusaur.png",
};


$(document).ready(function () {

    //Get data from pokedex (all pokemons) first AJAX call
    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/pokedex/1/",
        success: function (data) {
            console.log(data);
            const pokemonList = data.pokemon_entries;
            for (let index = 0; index < 5; index++) {
                const pokemon = pokemonList[index];
                const pokemonName = data.name;
                getPokemon(pokemon);
            }
        },
        dataType: 'json',
    }); //End first AJAX call


    //Get url to make second AJAX call
    function getPokemon(pokemon) {
        const pokemonUrl = pokemon.pokemon_species.url;
        getAllDataPokemon(pokemonUrl);
    } //Final getPokemon

    //Get the data of the specified pokemon and make second AJAX call
    function getAllDataPokemon(pokemonUrl) {
        $.ajax({
            type: "GET",
            url: pokemonUrl,
            success: function (data) {
                const pokemonName = data.name;
                const pokemonColor = data.color.name;
                const pokemonGenre = data.genera[4].genus;
                const pokemonHabitat = data.habitat.name;
                const pokemonGruop = data.egg_groups[0].name;
                const pokemonDescription = data.flavor_text_entries[3].flavor_text;
                const pokemonCaptureRate = data.capture_rate;
                createDOMPokemons(pokemonName, pokemonColor, pokemonGenre, pokemonHabitat, pokemonGruop, pokemonDescription, pokemonCaptureRate);
            },
            dataType: 'json',
        });
    } //End getAllDataPokemon


    //Creates the DOM elements for each pokemon and passes data to create the modal
    function createDOMPokemons(pokemonName, pokemonColor, pokemonGenre, pokemonHabitat, pokemonGruop, pokemonDescription, pokemonCaptureRate) {
        var srcPokemon = imagePokemon[pokemonName];
        var pokemonContainer = $("<div></div>");
        pokemonContainer.attr({
            class: 'col d-inline-block text-center',
            'id': pokemonName,

        });
        $("#container-pokemon").append(pokemonContainer);
        var pokemonImageLink = $("<a></a>");
        pokemonImageLink.attr({
            href: '#',
            'onclick': "showModal(event)",
            'data-name': pokemonName,
            'data-color': pokemonColor,
            'data-genre': pokemonGenre,
            'data-habitat': pokemonHabitat,
            'data-group': pokemonGruop,
            'data-capture': pokemonCaptureRate,
            'data-description': pokemonDescription,
            'data-image': srcPokemon,
        });
        pokemonContainer.append(pokemonImageLink);
        var pokemonImage = $("<img></img>");
        pokemonImage.attr({
            class: 'd-inline-block text-center pokemon',
            src: srcPokemon
        });
        pokemonImageLink.append(pokemonImage);
        var pokemonNameDOM = $("<h4></h4>").text(pokemonName);
        pokemonNameDOM.attr({
            class: 'font-weight-bold text-center',
        });
        pokemonContainer.append(pokemonNameDOM);
    } //End crate DOM pokemons


}); //End function ready