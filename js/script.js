"use strict";

(function(d){
    const input = d.querySelector(".upload_input");
    let buffer = null;
    let targetIdx = null;
    const charData = [];
    const offsetTable = {
        "Town": [11, 1],
        "Sex": [12, 1],
        "Align": [13, 1],
        "Race": [14, 1],
        "Class": [15, 1],
        "Mgt": [16, 1],
        "Mgt_cur": [107, 1],
        "Int": [17, 1],
        "Int_cur": [108, 1],
        "Per": [18, 1],
        "Per_cur": [109, 1],
        "Spd": [19, 1],
        "Spd_cur": [110, 1],
        "Acy": [20, 1],
        "Acy_cur": [111, 1],
        "Lck": [21, 1],
        "Lck_cur": [112, 1],
        "Thiev": [30, 1],
        "Level": [32, 1],
        "Age": [33, 1],
        "SL": [35, 1],
        "AC": [36, 1],
        "Food": [37, 1],
        "Cond": [38, 1],
        "End": [39, 1],
        "End_cur": [115, 1],
        "Eq_1": [40, 1],
        "Eq_2": [41, 1],
        "Eq_3": [42, 1],
        "Eq_4": [43, 1],
        "Eq_5": [44, 1],
        "Eq_6": [45, 1],
        "Eq_1_ch": [46, 1],
        "Eq_2_ch": [47, 1],
        "Eq_3_ch": [48, 1],
        "Eq_4_ch": [49, 1],
        "Eq_5_ch": [50, 1],
        "Eq_6_ch": [51, 1],
        "Eq_1_p": [52, 1],
        "Eq_2_p": [53, 1],
        "Eq_3_p": [54, 1],
        "Eq_4_p": [55, 1],
        "Eq_5_p": [56, 1],
        "Eq_6_p": [57, 1],
        "Bp_1": [58, 1],
        "Bp_2": [59, 1],
        "Bp_3": [60, 1],
        "Bp_4": [61, 1],
        "Bp_5": [62, 1],
        "Bp_6": [63, 1],
        "Bp_1_ch": [64, 1],
        "Bp_2_ch": [65, 1],
        "Bp_3_ch": [66, 1],
        "Bp_4_ch": [67, 1],
        "Bp_5_ch": [68, 1],
        "Bp_6_ch": [69, 1],
        "Bp_1_p": [70, 1],
        "Bp_2_p": [71, 1],
        "Bp_3_p": [72, 1],
        "Bp_4_p": [73, 1],
        "Bp_5_p": [74, 1],
        "Bp_6_p": [75, 1],
        "Skill_1": [80, 1],
        "Skill_2": [80, 1],
        "SP": [90, 2],
        "SP_cur": [88, 2],
        "Gems": [92, 2],
        "HP": [96, 2],
        "HP_cur": [94, 2],
        "Exp": [98, 4],
        "Gold": [102, 4]
    };
    const town = [
        "no where",
        "Middlegate",
        "Atlantium",
        "Tundara",
        "Vulcania",
        "Sandsober",
    ];
    const sex = [
        "Male",
        "Female",
    ];
    const alignment = [
        "Good",
        "neutral",
        "Evil",
    ];
    const race = [
        "Human",
        "Elf",
        "Dwarf",
        "Gnome",
        "H-Orc",
    ];
    const jobclass = [
        "Knight",
        "Paladin",
        "Archer",
        "Cleric",
        "Sorcerer",
        "Robber",
        "Ninja",
        "Barbarian",
    ];
    const condition = [
        "Good",
        "Cursed",
        "Silenced",
        "Diseased",
        "Poisoned",
        "Asleep",
        "Paralysed",
        "Dead",
        "Stone",
        "Eradicated",
    ];
    const skill = [
        "No skill",
        "Arms Mater",
        "Athlete",
        "Cartographer",
        "Crusader",
        "Diplomat",
        "Gambler",
        "Gladiator",
        "Hero/Heroine",
        "Linguist",
        "Merchant",
        "Mountaineer",
        "Navigator",
        "Pathfinder",
        "Pickpocket",
        "Solider",
    ];

    const items = [
    //["name", max charges, max plus,]
        ["            ", 0, 0],     //0x00
        ["Small Club  ", 0, 63],
        ["Small Knife ", 0, 63],
        ["Large Club  ", 0, 63],
        ["Dagger      ", 0, 63],
        ["Large Knife ", 0, 63],
        ["Hand Axe    ", 0, 63],
        ["Cudgel      ", 0, 63],
        ["Spiked Club ", 0, 63],
        ["Bull Whip   ", 0, 63],
        ["Long Dagger ", 0, 63],
        ["Maul        ", 0, 63],
        ["Short Sword ", 0, 63],
        ["Nunchakas   ", 0, 63],
        ["Mace        ", 0, 63],
        ["Spear       ", 0, 63],

        ["Cutlass     ", 0, 63],    //0x10
        ["Flail       ", 0, 63],
        ["Sabre       ", 0, 63],
        ["Long Sword  ", 0, 63],
        ["Wakizashi   ", 0, 63],
        ["Scimitar    ", 0, 63],
        ["Battle Axe  ", 0, 63],
        ["Broad Sword ", 0, 63],
        ["Katana      ", 0, 63],
        ["Slumber Club", 255, 63],
        ["Power Club  ", 0, 63],
        ["Lucky Knife ", 0, 63],
        ["Looter Knife", 0, 63],
        ["Power Cudgel", 0, 63],
        ["Energy Whip ", 255, 63],
        ["Sonic Whip  ", 255, 63],

        ["Mighty Whip ", 0, 63],    //0x20
        ["Scorch Maul ", 0, 63],
        ["Mauler Mace ", 0, 63],
        ["Exacto Spear", 0, 63],
        ["Fiery Spear ", 255, 63],
        ["Fast Cutlass", 0, 63],
        ["Quick Flail ", 0, 63],
        ["Shock Flail ", 255, 63],
        ["Sharp Sabre ", 0, 63],
        ["Ego Scimitar", 0, 63],
        ["True Axe    ", 255, 63],
        ["Blazing Axe ", 0, 63],
        ["Electric Axe", 255, 63],
        ["Rapid Katana", 0, 63],
        ["Accurate Swd", 0, 63],
        ["Chance Sword", 0, 63],

        ["Speedy Sword", 0, 63],    //0x30
        ["Flash Sword ", 255, 63],
        ["Flaming Swd ", 255, 63],
        ["Electric Swd", 255, 63],
        ["Acidic Sword", 255, 63],
        ["Cold Blade  ", 255, 63],
        ["Sage Dagger ", 255, 63],
        ["Holy Cudgel ", 255, 63],
        ["Divine Mace ", 255, 63],
        ["Ice Scimitar", 255, 63],
        ["Grand Axe   ", 255, 63],
        ["Swift Axe   ", 255, 63],
        ["Dyno Katana ", 255, 63],
        ["Force Sword ", 255, 63],
        ["Magic Sword ", 255, 63],
        ["Thunder Swd ", 255, 63],

        ["Energy Blade", 255, 63],   //0x40
        ["Photon Blade", 255, 63],
        ["Staff       ", 0, 63],
        ["Sickle      ", 0, 63],
        ["Scythe      ", 0, 63],
        ["Glaive      ", 0, 63],
        ["War Hammer  ", 0, 63],
        ["Trident     ", 0, 63],
        ["Pike        ", 0, 63],
        ["Naginata    ", 0, 63],
        ["Bardiche    ", 0, 63],
        ["Great Hammer", 0, 63],
        ["Halberd     ", 0, 63],
        ["Great Axe   ", 0, 63],
        ["Flamberge   ", 0, 63],
        ["Wind Staff  ", 255, 63],

        ["Tri-Sickle  ", 0, 63],    //0x50
        ["Ice Sickle  ", 255, 63],
        ["Fire Glaive ", 255, 63],
        ["Harsh Hammer", 0, 63],
        ["Stone Hammer", 0, 63],
        ["Genius Staff", 255, 63],
        ["Wizard Staff", 255, 63],
        ["Soul Scythe ", 255, 63],
        ["Dark Trident", 0, 63],
        ["Titan's Pike", 255, 63],
        ["Moon Halberd", 255, 63],
        ["Sun Naginata", 255, 63],
        ["Blowpipe    ", 0, 63],
        ["Sling       ", 0, 63],
        ["Short Bow   ", 0, 63],
        ["Crossbow    ", 0, 63],

        ["Long Bow    ", 0, 63],    //0x60
        ["Great Bow   ", 0, 63],
        ["Shaman Pipe ", 255, 63],
        ["Cinder Pipe ", 255, 63],
        ["Quiet Sling ", 255, 63],
        ["Pirates xBow", 255, 63],
        ["Burning xBow", 255, 63],
        ["Fireball Bow", 255, 63],
        ["Voltage Bow ", 255, 63],
        ["Giant Sling ", 255, 63],
        ["Energy Sling", 255, 63],
        ["Death Bow   ", 255, 63],
        ["Star Bow    ", 255, 63],
        ["Meteor Bow  ", 255, 63],
        ["Ancient Bow ", 255, 63],
        ["Green Key   ", 0, 0],

        ["Yellow Key  ", 0, 0],     //0x70
        ["Red Key     ", 0, 0],
        ["Black Key   ", 0, 0],
        ["Small Shield", 0, 63],
        ["Large Shield", 0, 63],
        ["Great Shield", 0, 63],
        ["Fire Shield ", 0, 63],
        ["Electric Shd", 0, 63],
        ["Acid Shield ", 0, 63],
        ["Cold Shield ", 0, 63],
        ["Silver Shld ", 0, 63],
        ["Bronze Shld ", 0, 63],
        ["Iron Shield ", 0, 63],
        ["Magic Shield", 0, 63],
        ["Gold Shield ", 0, 63],
        ["Padded Armor", 0, 63],

        ["Leather Suit", 0, 63],    //0x80
        ["Scale Armor ", 0, 63],
        ["Ring Mail   ", 0, 63],
        ["Chain Mail  ", 0, 63],
        ["Splint Mail ", 0, 63],
        ["Plate Mail  ", 0, 63],
        ["Plate Armor ", 0, 63],
        ["I Scale Mail", 0, 63],
        ["B Scale Mail", 0, 63],
        ["S Scale Mail", 0, 63],
        ["I Ring Mail ", 0, 63],
        ["B Ring Mail ", 0, 63],
        ["S Ring Mail ", 0, 63],
        ["I Chain Mail", 0, 63],
        ["B Chain Mail", 0, 63],
        ["S Chain Mail", 0, 63],

        ["I Splintmail", 0, 63],    //0x90
        ["B Splintmail", 0, 63],
        ["S Splintmail", 0, 63],
        ["I Plate Mail", 0, 63],
        ["B Plate Mail", 0, 63],
        ["S Plate Mail", 0, 63],
        ["G Scale Mail", 255, 63],
        ["G Ring Mail ", 255, 63],
        ["G Chain Mail", 255, 63],
        ["G Splintmail", 255, 63],
        ["G Plate Mail", 255, 63],
        ["Helm        ", 0, 63],
        ["Iron Helm   ", 0, 63],
        ["Bronze Helm ", 0, 63],
        ["Silver Helm ", 0, 63],
        ["Gold Helm   ", 255, 63],

        ["Magic Herbs ", 255, 0],    //0xA0
        ["Torch       ", 255, 0],
        ["Lantern     ", 255, 0],
        ["Thief's Pick", 0, 63],
        ["Rope'n'Hooks", 255, 0],
        ["Wakeup Horn ", 255, 0],
        ["Compass     ", 255, 0],
        ["Sextant     ", 255, 0],
        ["Force Potion", 255, 0],
        ["Skill Potion", 255, 0],
        ["MaxHP Potion", 255, 0],
        ["Holy Charm  ", 255, 0],
        ["Herbal Patch", 255, 0],
        ["Hero Medal  ", 255, 63],
        ["Silent Horn ", 255, 63],
        ["Magic Meal  ", 255, 0],

        ["Antidote Ale", 255, 0],    //0xB0
        ["Super Flare ", 255, 0],
        ["Dove's Blood", 255, 0],
        ["Ray Gun     ", 255, 63],
        ["Magic Charm ", 0, 63],
        ["Witch Broom ", 255, 0],
        ["Invisocloak ", 255, 63],
        ["Storm Wand  ", 255, 63],
        ["Lava Grenade", 255, 0],
        ["Hourglass   ", 255, 0],
        ["Instant Keep", 255, 0],
        ["Teleport Orb", 255, 0],
        ["Skeleton Key", 0, 63],
        ["Defense Ring", 255, 63],
        ["Mgt Gauntlet", 255, 63],
        ["Acy Gauntlet", 255, 63],

        ["Stealth Cape", 255, 63],    //0xC0
        ["Admit 8 Pass", 0, 0],
        ["Speed Boots ", 255, 63],
        ["Cureall Wand", 255, 63],
        ["Moon Rock   ", 255, 0],
        ["Ruby Ankh   ", 255, 63],
        ["Disruptor   ", 255, 63],
        ["Lich Hand   ", 255, 0],
        ["Phaser      ", 255, 63],
        ["Freeze Wand ", 255, 63],
        ["Energizer   ", 255, 0],
        ["Magic Mirror", 255, 0],
        ["Elven Cloak ", 255, 63],
        ["Elven Boots ", 0, 63],
        ["Sage Robe   ", 255, 63],
        ["Enchanted Id", 255, 63],

        ["Green Ticket", 0, 0],     //0xD0
        ["Yellow Tickt", 0, 0],
        ["Red Ticket  ", 0, 0],
        ["Black Ticket", 0, 0],
        ["Fe Farthing ", 0, 0],
        ["Castle Key  ", 0, 0],
        ["Mark's Keys ", 0, 0],
        ["Dog Whistle ", 255, 0],
        ["Web Caster  ", 255, 0],
        ["Monster Tome", 255, 0],
        ["Cupie Doll  ", 0, 0],
        ["Water Talon ", 0, 0],
        ["Air Talon   ", 0, 0],
        ["Fire Talon  ", 0, 0],
        ["Earth Talon ", 0, 0],
        ["Element Orb ", 255, 0],

        ["Gold Goblet ", 0, 0],     //0XE0
        ["+7 Loincloth", 0, 0],
        ["Valor Sword ", 0, 0],
        ["Honor Sword ", 0, 0],
        ["Noble Sword ", 0, 0],
        ["Corak's Soul", 0, 0],
        ["Emerald Ring", 0, 0],
        ["Water Disc  ", 0, 0],
        ["Air Disc    ", 0, 0],
        ["Fire Disc   ", 0, 0],
        ["Earth Disc  ", 0, 0],
        ["Sapphire Pin", 0, 0],
        ["Amethyst Box", 0, 0],
        ["Coral Broach", 0, 0],
        ["Lapis Scarab", 0, 0],
        ["Amber Skull ", 0, 0],

        ["Quartz Skull", 0, 0],     //0XF0
        ["Agate Grail ", 0, 0],
        ["Opal Pendant", 0, 0],
        ["Crystal Vial", 0, 0],
        ["Ruby Amulet ", 0, 0],
        ["Ivory Cameo ", 0, 0],
        ["Ruby Tiara  ", 0, 0],
        ["Onyx Effigy ", 0, 0],
        ["Pearl Choker", 0, 0],
        ["Topaz Shard ", 0, 0],
        ["Sun Crown   ", 0, 0],
        ["J-26 Fluxer ", 0, 0],
        ["M-27 Radicon", 0, 0],
        ["A-1 Todilor ", 0, 0],
        ["N-19 Capitor", 0, 0],
        ["Useless Item", 0, 0],
    ];
    function parseCharacter(dv) {
        const t = new Uint8Array(buffer, dv.byteOffset, 10);
        if (t[0] === 0) {
            return null;
        }

        const character = {};
        character.Name = new TextDecoder().decode(t);
        for (const key in offsetTable) {
            const val = offsetTable[key];
            if (val[1] === 1) {
                character[key] = dv.getUint8(val[0]);
            } else if (val[1] === 2) {
                character[key] = dv.getUint16(val[0], true);
            } else {
                character[key] = dv.getUint32(val[0], true);
            }
        }
        character["Skill_1"] &= 0x0F;
        character["Skill_2"] >>= 4;
        return character;
    }

    function setEditBox(box) {
        const cha = charData[targetIdx];
        for (const key of ["Name", "Level", "SL", "AC", "Thiev"]) {
            box.querySelector(`#e-${key}`).textContent = cha[key];
        }
        for (const key of ["Sex", "Align", "Race", "Cond", "Skill_1", "Skill_2"]) {
            box.querySelector(`#e-${key}`).children[cha[key]].selected = true;
        }
        for (const key of ["Age", "Mgt", "Mgt_cur", "Int", "Int_cur", "Per", "Per_cur", "End", "End_cur", "Spd", "Spd_cur", "Acy", "Acy_cur", "Lck", "Lck_cur", "HP", "HP_cur", "SP", "SP_cur", "Exp", "Gold","Food", "Gems"]) {
            box.querySelector(`#e-${key}`).value = `${cha[key]}`;
        }
        box.querySelector("#e-Town").textContent = town[cha["Town"]];
        box.querySelector("#e-Class").textContent = jobclass[cha["Class"]];
    }

    function setEquipped(box) {
        const cha = charData[targetIdx];
        for (let i = 1; i <= 6; ++i) {
            const key = `Eq_${i}`;
            let c0 = "", c1 = "", c2 = "";
            if (cha[key] !== 0) {
                c0 = `${items[cha[key]][0]}`;
                c1 = `${cha[`${key}_ch`]}`;
                c2 = `+${cha[`${key}_p`]}`;
            }
            box.querySelector(`#e-${key}`).textContent = c0;
            box.querySelector(`#e-${key}_ch`).textContent = c1;
            box.querySelector(`#e-${key}_p`).textContent = c2;
        }
    }

    function setMaxValuesBP(sl) {
        const item = items[parseInt(sl.value)];
        const id = sl.getAttribute("id");
        d.querySelector(`#${id}_ch`).max = item[1];
        d.querySelector(`#${id}_p`).max = item[2];
    }

    function setBackPack(box) {
        const cha = charData[targetIdx];
        for (let i = 1; i <= 6; ++i) {
            const key = `Bp_${i}`;
            const id = `#e-${key}`;
            const sl = box.querySelector(id);
            sl.children[cha[key]].selected = true;
            box.querySelector(`${id}_ch`).value = cha[`${key}_ch`];
            box.querySelector(`${id}_p`).value = cha[`${key}_p`];
            setMaxValuesBP(sl, id);
        }
    }

    function showEditBox() {
        const box = d.querySelector(".char-edit");
        setEditBox(box);
        setEquipped(box);
        setBackPack(box);
        box.style.display = "grid";
        box.classList.add("show");
    }

    function updateCharacter() {
        const cha = charData[targetIdx];
        for (const key in offsetTable) {
            if (["Town", "Class", "AC", "Level", "SL", "Thiev"].includes(key)) {
                continue;
            }
            if (key.includes("Eq_")) {
                continue;
            }
            const elm = d.getElementById(`e-${key}`);
            if (["INPUT", "SELECT"].includes(elm.nodeName)) {
                cha[key] = Math.max(0, parseInt(elm.value));
                continue;
            }
            cha[key] = (elm.textContent === '') ? 0 : parseInt(elm.textContent);
        }
        updateTable();
        d.querySelector(".char-edit").style.display = "none";
    }

    function parseBuffer() {
        while (charData.length > 0) {
            charData.pop();
        }
        for (let idx = 0; idx < 48; ++idx) {
            const dv = new DataView(buffer, idx * 130, 130);
            charData.push(parseCharacter(dv))
        }
    }

    function createRecord(cha, idx) {
        if (cha === null) {
            return `<tr class="record">
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>`;
        }
        return `<tr class="record">
            <td><button type="button" class="edit" data-target="${idx}">edit</button></td>
            <td>${cha.Name}</td>
            <td>${sex[cha.Sex]}</td>
            <td>${alignment[cha.Align]}</td>
            <td>${race[cha.Race]}</td>
            <td>${cha.Age}</td>
            <td>${jobclass[cha.Class]}</td>
            <td>${cha.Level}</td>
        </tr>`;
    }

    function createTable(elem, offset) {
        let html = "";
        for (let idx = offset; idx < offset + 24; ++idx) {
            const t = createRecord(charData[idx], idx);
            if (t !== null) {
                html += t;
            }
        }
        elem.innerHTML = html;
        for (const b of elem.querySelectorAll(".edit")) {
            b.addEventListener("click", function(){
                targetIdx = parseInt(this.dataset.target);
                showEditBox();
            });
        }
    }

    function removeAllChild(elm) {
        const clone = elm.cloneNode(false);
        elm.parentNode.replaceChild(clone, elm);
    }

    function updateTable() {
        removeAllChild(d.querySelector(".players"));
        createTable(d.querySelector(".players"), 0);
        removeAllChild(d.querySelector(".hirelings"));
        createTable(d.querySelector(".hirelings"), 24);
    }

    function showTables() {
        parseBuffer();
        createTable(d.querySelector(".players"), 0);
        createTable(d.querySelector(".hirelings"), 24);
        d.querySelector(".content").classList.add("loaded");
    }

    function modifyBuffer() {
        for (let idx = 0; idx < 48; ++idx) {
            const character = charData[idx];
            if (character === null) continue;
            const dv = new DataView(buffer, idx * 130, 130);
            for (const key in character) {
                if (["Name", "Skill_1", "Skill_2"].includes(key)) continue;
                const val = offsetTable[key];
                if (val[1] === 1) {
                    dv.setUint8(val[0], character[key]);
                } else if (val[1] === 2) {
                    dv.setUint16(val[0], character[key], true);
                } else {
                    dv.setUint32(val[0], character[key], true);
                }
            }
            dv.setUint8(80, character["Skill_1"] | (character["Skill_2"] << 4));
        }
    }

    function saveModData() {
        modifyBuffer();
        const blob = new Blob([buffer], {type: "octet/stream"});
        const a = d.createElement('a');
        a.download = "ROSTER.DAT";
        a.href = window.URL.createObjectURL(blob);
        a.click();
    }

    input.addEventListener("change", function(){
        if (this.value !== '') {
            this.parentNode.classList.add("selected");
        } else {
            this.parentNode.classList.remove("selected");
        }
    });

    d.querySelector(".upload_btn").addEventListener("click", ()=>{
        const file = input.files[0];
        if (file.name !== "ROSTER.DAT") return;
        if (file.type !== "") return;
        if (file.size < 8292) return;
        const reader = new FileReader();
        reader.onload = ()=>{
            buffer = reader.result;
            showTables();
        };
        reader.readAsArrayBuffer(file);
    });

    d.querySelector(".download_btn").addEventListener("click", saveModData);

    d.querySelector(".char-edit_close").addEventListener("click", function(){
        d.querySelector(".char-edit").style.display = "none";
    });

    d.querySelector(".char-edit_update_btn").addEventListener("click", function(){
        updateCharacter();
    });

    window.addEventListener("load", function(){
        const sl = d.createElement("select");
        for (let i = 0; i < 256; ++i) {
            const o = d.createElement("option");
            o.value = i;
            o.textContent = items[i][0];
            sl.appendChild(o);
        }
        for (let i = 1; i <= 6; ++i) {
            const id = `e-Bp_${i}`;
            const sc = sl.cloneNode(true);
            sc.setAttribute("id", id);
            sc.addEventListener("change", function(){
                setMaxValuesBP(this);
            });
            d.querySelector(`#${id}_sel`).appendChild(sc);
        }
    });
})(document);