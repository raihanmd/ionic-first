import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { arrowForwardCircleOutline } from "ionicons/icons";
import React from "react";

const Register: React.FC = () => {
  const router = useIonRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <form onSubmit={onSubmit}>
            <IonCardContent className="flex flex-col gap-4">
              <IonInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                labelPlacement="floating"
                fill="outline"
                clearInput
              />

              <IonInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                labelPlacement="floating"
                fill="outline"
                clearInput
              />

              <IonButton type="submit" expand="block">
                Register
                <IonIcon icon={arrowForwardCircleOutline} slot="end" />
              </IonButton>
            </IonCardContent>
          </form>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register;
