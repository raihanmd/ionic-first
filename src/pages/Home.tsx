import Intro from "@/components/Intro";
import { INTRO_KEY } from "@/const";
import { Preferences } from "@capacitor/preferences";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [isIntroDone, setIsIntroDone] = useState<boolean>(true);

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIsIntroDone(seen.value === "true");
    };

    checkStorage();
  }, [isIntroDone, setIsIntroDone]);

  const setIntroDone = async () => {
    await Preferences.set({ key: INTRO_KEY, value: "true" });
    setIsIntroDone(true);
  };

  const resetIntro = async () => {
    await Preferences.remove({ key: INTRO_KEY });
    setIsIntroDone(false);
  };

  if (!isIntroDone) return <Intro onDone={setIntroDone} />;

  return (
    <IonPage>
      <IonHeader color="primary">
        <IonToolbar>
          <IonTitle>Page Title</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent class="space-y-4">
            <IonButton color={"primary"} routerLink="/login" expand="block">
              Bring me to the login page
            </IonButton>
            <IonButton onClick={resetIntro} color={"secondary"} expand="block">
              Lemme see intro again
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
