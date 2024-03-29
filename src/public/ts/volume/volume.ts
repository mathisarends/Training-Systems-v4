import { checkWindowSize } from "./windowSizing.js";
import { addSwipeHandlers } from "../utils/swipeHandler.js";
import { calcIndividualizedVolume } from "./calcIndividualizedVolume.js";



document.addEventListener("DOMContentLoaded", () => {

    checkWindowSize();     // checks window size initially in order to apply the right style for bootstrap
    window.addEventListener("resize", checkWindowSize);

    let currentBlockType = "hypertrophie";

    /**
     * Handles the swipe action by toggling the current block type between "hypertrophie" and "kraft".
     * Additionally, it triggers the toggleCaption function and dispatches a change event on the genderSelect element. in order to update all volume recommandations
     */
    function handleSwipe() {
        currentBlockType = currentBlockType === "hypertrophie" ? "kraft" : "hypertrophie";
        toggleCaption();
        genderSelect.dispatchEvent(new Event("change"));
    }

    /**
     * Toggles the caption text content of the volume recommendation table based on the current training phase.
     * If the current phase is the hypertrophie phase, it updates the caption to the kraft phase, and vice versa.
     */
    function toggleCaption() {

        const trainingPhases = [
            "Hypertrophiephase",
            "Kraftphase"
        ]

        const volumeRecommandationTableCaption = document.getElementById("volume-recommandation-table-caption")!;
        const isVolumePhase = volumeRecommandationTableCaption.textContent?.includes("Hypertrophiephase");

        if (isVolumePhase) {
            volumeRecommandationTableCaption.textContent = `Volumenempfehlung - ${trainingPhases[1]}`;
        } else {
            volumeRecommandationTableCaption.textContent = `Volumenempfehlung - ${trainingPhases[0]}`
        }
    }

    const volumeRecommandationTableId = "volume-recommandation-table";
    addSwipeHandlers(volumeRecommandationTableId, handleSwipe, handleSwipe); // generic swipe handler logic

    const genderSelect = document.getElementById("gender-selector") as HTMLSelectElement;
    const genderAdjustField = document.querySelector(".gender-adjust") as HTMLInputElement;

    genderSelect.addEventListener("change", () => {
        let selectedGender = genderSelect.value;

        switch (selectedGender) {
            case "männlich":
                genderAdjustField.value = "0";
                break;
            case "weiblich":
                genderAdjustField.value = "2.5";
                break;
            // Weitere Fälle können hier hinzugefügt werden, falls benötigt
            default:
                // Behandlung für andere Werte, falls erforderlich
                break;
        }

        const changeEvent = new Event("change");

        bodyheightInput.dispatchEvent(changeEvent);
        bodyweightInput.dispatchEvent(changeEvent);

        calcVolumeAdjustment();
        calcIndividualizedVolume(parseInt(genderAdjustField.value), currentBlockType);
    });

    const bodyheightInput = document.getElementById("bodyheight") as HTMLInputElement;
    const bodyheightAdjustField = document.querySelector(".bodyheight-adjust") as HTMLInputElement;

    bodyheightInput.addEventListener("change", () => {
        const height: number = parseInt(bodyheightInput.value);
        const gender: string = genderSelect.value;

        switch (gender) {
            case "männlich":
                switch (true) {
                    case height < 170:
                        bodyheightAdjustField.value = "2";
                        break;
                    case height < 182:
                        bodyheightAdjustField.value = "1";
                        break;
                    case height < 195:
                        bodyheightAdjustField.value = "-1";
                        break;
                    default:
                        bodyheightAdjustField.value = "-2";
                        break;
                }
                break;

            case "weiblich":
                switch (true) {
                    case height < 160:
                        bodyheightAdjustField.value = "2";
                        break;
                    case height < 167:
                        bodyheightAdjustField.value = "1";
                        break;
                    case height < 175:
                        bodyheightAdjustField.value = "-1";
                        break;
                    default:
                        bodyheightAdjustField.value = "-2";
                        break;
                }
                break;

            default:
                // Behandlung für andere Werte, falls erforderlich
                break;
        }

        calcVolumeAdjustment();
        calcIndividualizedVolume(parseInt(bodyheightAdjustField.value), currentBlockType);
    });

    const bodyweightInput = document.getElementById("bodyweight") as HTMLInputElement;
    const bodyweightAdjustField = document.querySelector(".bodyweight-adjust") as HTMLInputElement;

    bodyweightInput.addEventListener("change", () => {
        const weight: number = parseInt(bodyweightInput.value);
        const gender: string = genderSelect.value;

        switch (gender) {
            case "männlich":
                switch (true) {
                    case weight < 74:
                        bodyweightAdjustField.value = "4";
                        break;
                    case weight < 105:
                        bodyweightAdjustField.value = "2";
                        break;
                    case weight <= 120:
                        bodyweightAdjustField.value = "-2";
                        break;
                    default:
                        bodyweightAdjustField.value = "-4";
                        break;
                }
                break;

            case "weiblich":
                switch (true) {
                    case weight < 57:
                        bodyweightAdjustField.value = "3";
                        break;
                    case weight < 72:
                        bodyweightAdjustField.value = "1";
                        break;
                    case weight <= 84:
                        bodyweightAdjustField.value = "-2";
                        break;
                    default:
                        bodyweightAdjustField.value = "-4";
                        break;
                }
                break;

            default:
                // Behandlung für andere Werte, falls erforderlich
                break;
        }

        calcVolumeAdjustment();
        calcIndividualizedVolume(parseInt(bodyweightAdjustField.value), currentBlockType);
    });

    const ageInput = document.getElementById("age") as HTMLInputElement;
    const ageAdjustField = document.querySelector(".age-adjust") as HTMLInputElement;

    ageInput.addEventListener("change", () => {
        const age: number = parseInt(ageInput.value);

        switch (true) {
            case age < 15:
                ageAdjustField.value = "2";
                break;
            case age < 25:
                ageAdjustField.value = "1";
                break;
            case age < 35:
                ageAdjustField.value = "0";
                break;
            case age < 45:
                ageAdjustField.value = "-2";
                break;
            default:
                ageAdjustField.value = "-4";
                break;
        }

        calcVolumeAdjustment();
        calcIndividualizedVolume(parseInt(ageAdjustField.value), currentBlockType);
    });


    const trainingExperienceInput = document.getElementById("trainingExperience") as HTMLInputElement;
    const trainingExperienceAdjustField = document.querySelector(".experience-adjust") as HTMLInputElement;

    trainingExperienceInput.addEventListener("change", () => {
        const trainingsExperience : number = parseInt(trainingExperienceInput.value);

        switch (true) {
            case trainingsExperience <= 1:
                trainingExperienceAdjustField.value = "1";
                break;
            case trainingsExperience <= 3:
                trainingExperienceAdjustField.value = "0";
                break;
            case trainingsExperience <= 5:
                trainingExperienceAdjustField.value = "-1";
                break;
            case trainingsExperience > 5:
                trainingExperienceAdjustField.value = "-3";
                break;
            default:
                trainingExperienceAdjustField.value = "0";
                break;
        }

        calcVolumeAdjustment();
        calcIndividualizedVolume(parseInt(trainingExperienceAdjustField.value), currentBlockType);
    });

    const nutritionSelect = document.getElementById("nutrition") as HTMLInputElement;
    const nutritionAdjustField = document.querySelector(".nutrition-adjust") as HTMLInputElement;

    nutritionSelect.addEventListener("change", () => {
        const nutritionLevel = nutritionSelect.value;

        switch (nutritionLevel) {
            case "schlecht":
                nutritionAdjustField.value = "-3";
                break;
            case "gut":
                nutritionAdjustField.value = "0";
                break;
            default:
                nutritionAdjustField.value = "1";
                break;
        }

        calcVolumeAdjustment();
        calcIndividualizedVolume(parseInt(nutritionAdjustField.value), currentBlockType);
    });

    const sleepSelect = document.getElementById("sleep") as HTMLInputElement;
    const sleepAdjustField = document.querySelector(".sleep-adjust") as HTMLInputElement;

    sleepSelect.addEventListener("change", () => {
        const sleepLevel = sleepSelect.value;

        switch (sleepLevel) {
            case "schlecht":
                sleepAdjustField.value = "-3";
                break;
            case "gut":
                sleepAdjustField.value = "0";
                break;
            default:
                sleepAdjustField.value = "1";
                break;
        }

        calcVolumeAdjustment();
        calcIndividualizedVolume(parseInt(sleepAdjustField.value), currentBlockType);
    });

    const stressSelect = document.getElementById("stress") as HTMLInputElement;
    const stressAdjustField = document.querySelector(".stress-adjust") as HTMLInputElement;

    stressSelect.addEventListener("change", () => {
        const stressLevel = stressSelect.value;

        switch (stressLevel) {
            case "hoch":
                stressAdjustField.value = "-3";
                break;
            case "mittel":
                stressAdjustField.value = "0";
                break;
            default:
                stressAdjustField.value = "1";
                break;
        }

        calcVolumeAdjustment();
        calcIndividualizedVolume(parseInt(stressAdjustField.value), currentBlockType);
    });

    const manualSelect = document.getElementById("manual") as HTMLInputElement;
    const manualAdjustField = document.querySelector(".manual-adjust") as HTMLInputElement;

    manualSelect.addEventListener("change", () => {
        const manuelFactor = parseInt(manualSelect.value);

        switch (manuelFactor) {
            case -5:
            case -4:
            case -3:
            case -2:
            case -1:
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                manualAdjustField.value = manuelFactor.toString();
                break;
            default:
                // Behandlung für andere Werte, falls erforderlich
                break;
        }
        calcVolumeAdjustment();
        calcIndividualizedVolume(parseInt(manualAdjustField.value), currentBlockType);
    });


    function calcVolumeAdjustment() {

        const genderVal = genderAdjustField.value
            ? parseInt(genderAdjustField.value)
            : 0;
        const bwVal = bodyweightAdjustField.value
            ? parseInt(bodyweightAdjustField.value)
            : 0;
        const bhVal = bodyheightAdjustField.value
            ? parseInt(bodyheightAdjustField.value)
            : 0;
        const trainingExpVal = trainingExperienceAdjustField.value
            ? parseInt(trainingExperienceAdjustField.value)
            : 0;
        const ageVal = ageAdjustField.value ? parseInt(ageAdjustField.value) : 0;
        const nutritionVal = nutritionAdjustField.value
            ? parseInt(nutritionAdjustField.value)
            : 0;
        const sleepVal = sleepAdjustField.value
            ? parseInt(sleepAdjustField.value)
            : 0;
        const stressVal = stressAdjustField.value
            ? parseInt(stressAdjustField.value)
            : 0;
        const regVal = manualSelect.value
            ? parseInt(manualAdjustField.value)
            : 0;

        const result =
            genderVal +
            bwVal +
            bhVal +
            trainingExpVal +
            ageVal +
            nutritionVal +
            sleepVal +
            stressVal +
            regVal;


        const volumeAdjustField = document.querySelector(".result-adjust") as HTMLInputElement;

        volumeAdjustField.value = result.toString();
    }

    // hier weil alle inputs zunächst getriggert werden werden immer alle werte mit geschickt!


    // Volume Samples
    // not only for squat, bench, deadlift
    // adjust default values for squat bench deadlift to be more moderate

    const event = new Event("change");
    genderSelect.dispatchEvent(event);
    bodyweightInput.dispatchEvent(event);
    bodyheightInput.dispatchEvent(event);
    trainingExperienceInput.dispatchEvent(event);
    ageInput.dispatchEvent(event);
    nutritionSelect.dispatchEvent(event);
    sleepSelect.dispatchEvent(event);
    stressSelect.dispatchEvent(event);
    manualSelect.dispatchEvent(event);
    calcVolumeAdjustment();
    //calcIndividualizedVolume();

})









