import { IonButton, IonIcon } from "@ionic/react";
import { PropsWithChildren } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { arrowForwardCircleOutline } from "ionicons/icons";

type Props = {
  onDone: () => void;
};

function SwiperButtonNext({ children }: PropsWithChildren) {
  const swiper = useSwiper();
  return (
    <IonButton
      shape="round"
      fill="clear"
      className="!p-2 text-3xl text-white"
      onClick={() => swiper.slideNext()}
    >
      {children}
    </IonButton>
  );
}

export default function Intro({ onDone }: Props) {
  return (
    <Swiper className="!flex min-h-screen items-center justify-center bg-purple-500 object-cover">
      <SwiperSlide className="!flex w-full flex-col items-center justify-center gap-5 px-5 text-center">
        <h1 className="text-3xl font-semibold text-white">
          Greetings👋, Welcome to my epic skibidi rizz app
        </h1>
        <SwiperButtonNext>
          <IonIcon icon={arrowForwardCircleOutline} />
        </SwiperButtonNext>
      </SwiperSlide>
      <SwiperSlide className="!flex w-full flex-col items-center justify-center gap-5 px-5 text-center">
        <h1 className="text-3xl font-semibold text-white">
          Now let's begin your epic journey ✈️
        </h1>
        <IonButton
          color={"light"}
          shape="round"
          mode="ios"
          className="!p-2 text-xl text-white"
          onClick={onDone}
        >
          Get Started
        </IonButton>
      </SwiperSlide>
    </Swiper>
  );
}
