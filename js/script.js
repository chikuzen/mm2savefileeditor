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
        "Neutral",
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
    //["name", max charges, max plus, AC]
        ["            ",   0,  0,  0],     //0x00
        ["Small Club  ",   0, 63,  0],
        ["Small Knife ",   0, 63,  0],
        ["Large Club  ",   0, 63,  0],
        ["Dagger      ",   0, 63,  0],
        ["Large Knife ",   0, 63,  0],
        ["Hand Axe    ",   0, 63,  0],
        ["Cudgel      ",   0, 63,  0],
        ["Spiked Club ",   0, 63,  0],
        ["Bull Whip   ",   0, 63,  0],
        ["Long Dagger ",   0, 63,  0],
        ["Maul        ",   0, 63,  0],
        ["Short Sword ",   0, 63,  0],
        ["Nunchakas   ",   0, 63,  0],
        ["Mace        ",   0, 63,  0],
        ["Spear       ",   0, 63,  0],

        ["Cutlass     ",   0, 63,  0],    //0x10
        ["Flail       ",   0, 63,  0],
        ["Sabre       ",   0, 63,  0],
        ["Long Sword  ",   0, 63,  0],
        ["Wakizashi   ",   0, 63,  0],
        ["Scimitar    ",   0, 63,  0],
        ["Battle Axe  ",   0, 63,  0],
        ["Broad Sword ",   0, 63,  0],
        ["Katana      ",   0, 63,  0],
        ["Slumber Club", 255, 63,  0],
        ["Power Club  ",   0, 63,  0],
        ["Lucky Knife ",   0, 63,  0],
        ["Looter Knife",   0, 63,  0],
        ["Power Cudgel",   0, 63,  0],
        ["Energy Whip ", 255, 63,  0],
        ["Sonic Whip  ", 255, 63,  0],

        ["Mighty Whip ",   0, 63,  0],    //0x20
        ["Scorch Maul ",   0, 63,  0],
        ["Mauler Mace ",   0, 63,  0],
        ["Exacto Spear",   0, 63,  0],
        ["Fiery Spear ", 255, 63,  0],
        ["Fast Cutlass",   0, 63,  0],
        ["Quick Flail ",   0, 63,  0],
        ["Shock Flail ", 255, 63,  0],
        ["Sharp Sabre ",   0, 63,  0],
        ["Ego Scimitar",   0, 63,  0],
        ["True Axe    ", 255, 63,  0],
        ["Blazing Axe ",   0, 63,  0],
        ["Electric Axe", 255, 63,  0],
        ["Rapid Katana",   0, 63,  0],
        ["Accurate Swd",   0, 63,  0],
        ["Chance Sword",   0, 63,  0],

        ["Speedy Sword",   0, 63,  0],    //0x30
        ["Flash Sword ", 255, 63,  0],
        ["Flaming Swd ", 255, 63,  0],
        ["Electric Swd", 255, 63,  0],
        ["Acidic Sword", 255, 63,  0],
        ["Cold Blade  ", 255, 63,  0],
        ["Sage Dagger ", 255, 63,  0],
        ["Holy Cudgel ", 255, 63,  0],
        ["Divine Mace ", 255, 63, 10],
        ["Ice Scimitar", 255, 63,  0],
        ["Grand Axe   ", 255, 63,  0],
        ["Swift Axe   ", 255, 63,  0],
        ["Dyno Katana ", 255, 63,  0],
        ["Force Sword ", 255, 63,  0],
        ["Magic Sword ", 255, 63,  0],
        ["Thunder Swd ", 255, 63,  0],

        ["Energy Blade", 255, 63,  0],   //0x40
        ["Photon Blade", 255, 63,  0],
        ["Staff       ",   0, 63,  0],
        ["Sickle      ",   0, 63,  0],
        ["Scythe      ",   0, 63,  0],
        ["Glaive      ",   0, 63,  0],
        ["War Hammer  ",   0, 63,  0],
        ["Trident     ",   0, 63,  0],
        ["Pike        ",   0, 63,  0],
        ["Naginata    ",   0, 63,  0],
        ["Bardiche    ",   0, 63,  0],
        ["Great Hammer",   0, 63,  0],
        ["Halberd     ",   0, 63,  0],
        ["Great Axe   ",   0, 63,  0],
        ["Flamberge   ",   0, 63,  0],
        ["Wind Staff  ", 255, 63,  0],

        ["Tri-Sickle  ",   0, 63,  0],    //0x50
        ["Ice Sickle  ", 255, 63,  0],
        ["Fire Glaive ", 255, 63,  0],
        ["Harsh Hammer",   0, 63,  0],
        ["Stone Hammer",   0, 63,  0],
        ["Genius Staff", 255, 63,  0],
        ["Wizard Staff", 255, 63,  0],
        ["Soul Scythe ", 255, 63,  0],
        ["Dark Trident",   0, 63,  0],
        ["Titan's Pike", 255, 63,  0],
        ["Moon Halberd", 255, 63,  0],
        ["Sun Naginata", 255, 63,  0],
        ["Blowpipe    ",   0, 63,  0],
        ["Sling       ",   0, 63,  0],
        ["Short Bow   ",   0, 63,  0],
        ["Crossbow    ",   0, 63,  0],

        ["Long Bow    ",   0, 63,  0],    //0x60
        ["Great Bow   ",   0, 63,  0],
        ["Shaman Pipe ", 255, 63,  0],
        ["Cinder Pipe ", 255, 63,  0],
        ["Quiet Sling ", 255, 63,  0],
        ["Pirates xBow", 255, 63,  0],
        ["Burning xBow", 255, 63,  0],
        ["Fireball Bow", 255, 63,  0],
        ["Voltage Bow ", 255, 63,  0],
        ["Giant Sling ", 255, 63,  0],
        ["Energy Sling", 255, 63,  0],
        ["Death Bow   ", 255, 63,  0],
        ["Star Bow    ", 255, 63,  0],
        ["Meteor Bow  ", 255, 63,  0],
        ["Ancient Bow ", 255, 63,  0],
        ["Green Key   ",   0,  0,  0],

        ["Yellow Key  ",   0,  0,  0],     //0x70
        ["Red Key     ",   0,  0,  0],
        ["Black Key   ",   0,  0,  0],
        ["Small Shield",   0, 63,  1],
        ["Large Shield",   0, 63,  2],
        ["Great Shield",   0, 63,  3],
        ["Fire Shield ",   0, 63,  3],
        ["Electric Shd",   0, 63,  3],
        ["Acid Shield ",   0, 63,  3],
        ["Cold Shield ",   0, 63,  3],
        ["Silver Shld ",   0, 63,  3],
        ["Bronze Shld ",   0, 63,  3],
        ["Iron Shield ",   0, 63,  3],
        ["Magic Shield",   0, 63,  5],
        ["Gold Shield ",   0, 63,  7],
        ["Padded Armor",   0, 63,  2],

        ["Leather Suit",   0, 63,  3],    //0x80
        ["Scale Armor ",   0, 63,  4],
        ["Ring Mail   ",   0, 63,  5],
        ["Chain Mail  ",   0, 63,  6],
        ["Splint Mail ",   0, 63,  7],
        ["Plate Mail  ",   0, 63,  8],
        ["Plate Armor ",   0, 63, 10],
        ["I Scale Mail",   0, 63,  4],
        ["B Scale Mail",   0, 63,  4],
        ["S Scale Mail",   0, 63,  4],
        ["I Ring Mail ",   0, 63,  5],
        ["B Ring Mail ",   0, 63,  5],
        ["S Ring Mail ",   0, 63,  5],
        ["I Chain Mail",   0, 63,  6],
        ["B Chain Mail",   0, 63,  6],
        ["S Chain Mail",   0, 63,  6],

        ["I Splintmail",   0, 63,  7],    //0x90
        ["B Splintmail",   0, 63,  7],
        ["S Splintmail",   0, 63,  7],
        ["I Plate Mail",   0, 63,  8],
        ["B Plate Mail",   0, 63,  8],
        ["S Plate Mail",   0, 63,  8],
        ["G Scale Mail", 255, 63,  6],
        ["G Ring Mail ", 255, 63,  7],
        ["G Chain Mail", 255, 63,  8],
        ["G Splintmail", 255, 63,  9],
        ["G Plate Mail", 255, 63, 12],
        ["Helm        ",   0, 63,  2],
        ["Iron Helm   ",   0, 63,  2],
        ["Bronze Helm ",   0, 63,  2],
        ["Silver Helm ",   0, 63,  3],
        ["Gold Helm   ", 255, 63,  4],

        ["Magic Herbs ", 255,  0,  0],    //0xA0
        ["Torch       ", 255,  0,  0],
        ["Lantern     ", 255,  0,  0],
        ["Thief's Pick",   0, 63,  0],
        ["Rope'n'Hooks", 255,  0,  0],
        ["Wakeup Horn ", 255,  0,  0],
        ["Compass     ", 255,  0,  0],
        ["Sextant     ", 255,  0,  0],
        ["Force Potion", 255,  0,  0],
        ["Skill Potion", 255,  0,  0],
        ["MaxHP Potion", 255,  0,  0],
        ["Holy Charm  ", 255,  0,  0],
        ["Herbal Patch", 255,  0,  0],
        ["Hero Medal  ", 255, 63,  0],
        ["Silent Horn ", 255, 63,  0],
        ["Magic Meal  ", 255,  0,  0],

        ["Antidote Ale", 255,  0,  0],    //0xB0
        ["Super Flare ", 255,  0,  0],
        ["Dove's Blood", 255,  0,  0],
        ["Ray Gun     ", 255, 63,  0],
        ["Magic Charm ",   0, 63,  0],
        ["Witch Broom ", 255,  0,  0],
        ["Invisocloak ", 255, 63,  6],
        ["Storm Wand  ", 255, 63,  0],
        ["Lava Grenade", 255,  0,  0],
        ["Hourglass   ", 255,  0,  0],
        ["Instant Keep", 255,  0,  0],
        ["Teleport Orb", 255,  0,  0],
        ["Skeleton Key",   0, 63,  0],
        ["Defense Ring", 255, 63,  2],
        ["Mgt Gauntlet", 255, 63,  0],
        ["Acy Gauntlet", 255, 63,  0],

        ["Stealth Cape", 255, 63,  0],    //0xC0
        ["Admit 8 Pass",   0,  0,  0],
        ["Speed Boots ", 255, 63,  0],
        ["Cureall Wand", 255, 63,  0],
        ["Moon Rock   ", 255,  0,  0],
        ["Ruby Ankh   ", 255, 63,  0],
        ["Disruptor   ", 255, 63,  0],
        ["Lich Hand   ", 255,  0,  0],
        ["Phaser      ", 255, 63,  0],
        ["Freeze Wand ", 255, 63,  0],
        ["Energizer   ", 255,  0,  0],
        ["Magic Mirror", 255,  0,  0],
        ["Elven Cloak ", 255, 63,  5],
        ["Elven Boots ",   0, 63,  0],
        ["Sage Robe   ", 255, 63,  0],
        ["Enchanted Id", 255, 63,  0],

        ["Green Ticket",   0,  0,  0],     //0xD0
        ["Yellow Tickt",   0,  0,  0],
        ["Red Ticket  ",   0,  0,  0],
        ["Black Ticket",   0,  0,  0],
        ["Fe Farthing ",   0,  0,  0],
        ["Castle Key  ",   0,  0,  0],
        ["Mark's Keys ",   0,  0,  0],
        ["Dog Whistle ", 255,  0,  0],
        ["Web Caster  ", 255,  0,  0],
        ["Monster Tome", 255,  0,  0],
        ["Cupie Doll  ",   0,  0,  0],
        ["Water Talon ",   0,  0,  0],
        ["Air Talon   ",   0,  0,  0],
        ["Fire Talon  ",   0,  0,  0],
        ["Earth Talon ",   0,  0,  0],
        ["Element Orb ", 255,  0,  0],

        ["Gold Goblet ",   0,  0,  0],     //0XE0
        ["+7 Loincloth",   0,  0,  0],
        ["Valor Sword ",   0,  0,  0],
        ["Honor Sword ",   0,  0,  0],
        ["Noble Sword ",   0,  0,  0],
        ["Corak's Soul",   0,  0,  0],
        ["Emerald Ring",   0,  0, 15],
        ["Water Disc  ",   0,  0,  0],
        ["Air Disc    ",   0,  0,  0],
        ["Fire Disc   ",   0,  0,  0],
        ["Earth Disc  ",   0,  0,  0],
        ["Sapphire Pin",   0,  0,  0],
        ["Amethyst Box",   0,  0,  0],
        ["Coral Broach",   0,  0,  0],
        ["Lapis Scarab",   0,  0,  0],
        ["Amber Skull ",   0,  0,  0],

        ["Quartz Skull",   0,  0,  0],     //0XF0
        ["Agate Grail ",   0,  0,  0],
        ["Opal Pendant",   0,  0,  0],
        ["Crystal Vial",   0,  0,  0],
        ["Ruby Amulet ",   0,  0,  0],
        ["Ivory Cameo ",   0,  0,  0],
        ["Ruby Tiara  ",   0,  0,  0],
        ["Onyx Effigy ",   0,  0,  0],
        ["Pearl Choker",   0,  0,  0],
        ["Topaz Shard ",   0,  0,  0],
        ["Sun Crown   ",   0,  0,  0],
        ["J-26 Fluxer ",   0,  0,  0],
        ["M-27 Radicon",   0,  0,  0],
        ["A-1 Todilor ",   0,  0,  0],
        ["N-19 Capitor",   0,  0,  0],
        ["Useless Item",   0,  0,  0],
    ];

    function getAttrBonus(attr) {
        const table = [
            {min: 150, div: 25, base: 15},
            {min:  30, div: 15, base:  7},
            {min:  22, div:  4, base:  5},
            {min:  19, div:  3, base:  4},
            {min:  11, div:  2, base:  0},
        ];
        for (const r of table) {
            if (attr >= r.min) {
                return (((attr - r.min) / r.div) | 0) + r.base;
            }
        }
        return 0;
    }

    function recalcurateAC(cha) {
        let ac = getAttrBonus(cha.Spd_cur);
        for (let i = 1; i <= 6; ++i) {
            const key = `Eq_${i}`;
            if (items[cha[key]][3] > 0) {
                ac += items[cha[key]][3] + cha[`${key}_p`];
            }
        }
        cha.AC = ac;
    }

    function recalcurateSP(cha) {
        const cc = jobclass[cha.Class];
        if (["Knight", "Robber", "Ninja", "Barbarian"].includes(cc)) {
            cha.SP = 0;
            return;
        }
        const sp = Math.max(0, cha.Level - 6 * ["Paladin", "Archer"].includes(cc));
        cha.SP = sp * (3 + getAttrBonus(["Archer", "Sorcerer"].includes(cc) ? cha.Int : cha.Per));
    }

    function setEditBox(box) {
        const cha = charData[targetIdx];
        for (const key of ["Name", "Level", "SL", "AC", "SP", "Thiev"]) {
            box.querySelector(`#e-${key}`).textContent = cha[key];
        }
        for (const key of ["Sex", "Align", "Race", "Cond", "Skill_1", "Skill_2"]) {
            box.querySelector(`#e-${key}`).children[cha[key]].selected = true;
        }
        for (const key of ["Age", "Mgt", "Mgt_cur", "Int", "Int_cur", "Per", "Per_cur", "End", "End_cur", "Spd", "Spd_cur", "Acy", "Acy_cur", "Lck", "Lck_cur", "HP", "HP_cur", "SP_cur", "Exp", "Gold","Food", "Gems"]) {
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

    function updateCharacter() {
        const cha = charData[targetIdx];
        for (const key in offsetTable) {
            if (["Town", "Class", "SP", "AC", "Level", "SL", "Thiev"].includes(key)) {
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
        recalcurateAC(cha);
        recalcurateSP(cha);
        updateTable();
        d.querySelector(".char-edit").style.display = "none";
    }

    d.querySelector(".char-edit_update_btn").addEventListener("click", function(){
        updateCharacter();
    });


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

    function parseBuffer() {
        while (charData.length > 0) {
            charData.pop();
        }
        for (let idx = 0; idx < 48; ++idx) {
            const dv = new DataView(buffer, idx * 130, 130);
            charData.push(parseCharacter(dv))
        }
    }

    function showTables() {
        parseBuffer();
        createTable(d.querySelector(".players"), 0);
        createTable(d.querySelector(".hirelings"), 24);
        d.querySelector(".content").classList.add("loaded");
    }

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

    d.querySelector(".download_btn").addEventListener("click", ()=>{
        modifyBuffer();
        const blob = new Blob([buffer], {type: "octet/stream"});
        const a = d.createElement('a');
        a.download = "ROSTER.DAT";
        a.href = window.URL.createObjectURL(blob);
        a.click();
    });

    d.querySelector(".char-edit_close").addEventListener("click", function(){
        d.querySelector(".char-edit").style.display = "none";
    });

    input.addEventListener("change", function(){
        if (this.value !== '') {
            this.parentNode.classList.add("selected");
        } else {
            this.parentNode.classList.remove("selected");
        }
    });

    function createSelectbox() {
        const category = [
            {"name": "Sex",     "list": sex},
            {"name": "Align",   "list": alignment},
            {"name": "Race",    "list": race},
            {"name": "Cond",    "list": condition},
            {"name": "Skill_1", "list": skill},
            {"name": "Skill_2", "list": skill},
        ];
        for (const c of category) {
            const s = d.querySelector(`#e-${c.name}`);
            c.list.forEach((e, i)=>{
                const o = d.createElement("option");
                o.value = i;
                o.textContent = e;
                s.appendChild(o);
            });
        }
    }

    function createBackpackSelectbox() {
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
            sc.setAttribute("title", `equipped item ${i}`);
            sc.addEventListener("change", function(){
                setMaxValuesBP(this);
            });
            d.querySelector(`#${id}_sel`).appendChild(sc);
        }
    }
    window.addEventListener("load", function(){
        createSelectbox();
        createBackpackSelectbox();
    });
})(document);