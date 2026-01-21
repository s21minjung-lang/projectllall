const healthForm = document.querySelector("#health-form");
const summaryWeight = document.querySelector("#summary-weight");
const summaryWeightCompare = document.querySelector("#summary-weight-compare");
const summaryCondition = document.querySelector("#summary-condition");
const summaryConditionCompare = document.querySelector("#summary-condition-compare");
const summaryMedication = document.querySelector("#summary-medication");
const summaryMedicationCompare = document.querySelector("#summary-medication-compare");

const updateHealthSummary = ({ weight, condition, medication }) => {
  const weightValue = Number(weight);
  const yesterdayWeight = weightValue - 0.4;
  const lastWeekWeight = weightValue + 0.6;
  const weightDelta = (weightValue - yesterdayWeight).toFixed(1);

  if (summaryWeight) {
    summaryWeight.textContent = `${weightValue.toFixed(1)} kg`;
  }

  if (summaryWeightCompare) {
    summaryWeightCompare.textContent = `어제 대비 ${weightDelta} kg, 지난주 대비 ${(
      weightValue - lastWeekWeight
    ).toFixed(1)} kg`;
  }

  if (summaryCondition) {
    summaryCondition.textContent = condition;
  }

  if (summaryConditionCompare) {
    summaryConditionCompare.textContent =
      condition === "좋음"
        ? "지난주 평균보다 컨디션이 상승했어요."
        : condition === "보통"
        ? "지난주 평균과 비슷한 컨디션입니다."
        : "어제보다 피로도가 높아졌어요.";
  }

  if (summaryMedication) {
    summaryMedication.textContent = medication;
  }

  if (summaryMedicationCompare) {
    summaryMedicationCompare.textContent =
      medication === "복용 완료"
        ? "지난주 복약률보다 +5% 상승했습니다."
        : medication === "부분 복용"
        ? "복약률이 평균보다 낮아요."
        : "복약 누락이 있어 리마인드가 필요합니다.";
  }
};

const loadStoredHealthData = () => {
  const stored = localStorage.getItem("llall-health-data");
  if (!stored) {
    return;
  }
  const parsed = JSON.parse(stored);
  updateHealthSummary(parsed);
};

healthForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(healthForm);
  const payload = {
    weight: formData.get("weight"),
    condition: formData.get("condition"),
    medication: formData.get("medication"),
  };
  localStorage.setItem("llall-health-data", JSON.stringify(payload));
  window.location.href = "health-summary.html";
});

loadStoredHealthData();

const toggleButtons = document.querySelectorAll(".toggle-button");
const subSections = document.querySelectorAll(".sub-section");

const setActiveSection = (targetId) => {
  subSections.forEach((section) => {
    section.classList.toggle("active", section.id === targetId);
  });
  toggleButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.toggle === targetId);
  });
};

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.toggle;
    if (targetId) {
      setActiveSection(targetId);
    }
  });
});
