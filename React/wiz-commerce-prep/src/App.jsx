// 👇 Change LESSON number as you go: 0 → 1 → 2 → 3 → 4
import Lesson0_ShowList from "./lessons/Lesson0_ShowList";
import Lesson1_Remember from "./lessons/Lesson1_Remember";
import Lesson2_TypeToSearch from "./lessons/Lesson2_TypeToSearch";
import Lesson3_SimpleCart from "./lessons/Lesson3_SimpleCart";
import Lesson4_YouBuildSearch from "./lessons/Lesson4_YouBuildSearch";

const LESSON = 0; // ← you are here: build search YOURSELF

function App() {
  if (LESSON === 0) return <Lesson0_ShowList />;
  if (LESSON === 1) return <Lesson1_Remember />;
  if (LESSON === 2) return <Lesson2_TypeToSearch />;
  if (LESSON === 3) return <Lesson3_SimpleCart />;
  if (LESSON === 4) return <Lesson4_YouBuildSearch />;
  return <Lesson0_ShowList />;
}

export default App;
