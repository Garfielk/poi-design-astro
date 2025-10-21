import { Calendar, MapPin } from "lucide-react";
import eicmaMilan from "@/assets/events/eicma-milan.jpg";
import intermotCologne from "@/assets/events/intermot-cologne.jpg";
import motogpEvent from "@/assets/events/motogp-event.jpg";
import ispoMunich from "@/assets/events/ispo-munich.jpg";
import {getLocalizedPath, useTranslations} from "@/i18n/utils.ts";
import type {Language} from "@/i18n/config.ts";

interface Props {
  lang: Language;
  events: Record<string, any>[]
}


const Events = ({lang, events}: Props) => {
  const {t} = useTranslations(lang);

  return (
    <>
      <div className="pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Events
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join us at major international exhibitions and sporting events
              </p>
            </div>

            <div className="space-y-6">
              {events.map((event) => (
                <a
                  key={event.id}
                  href={getLocalizedPath(`/events/${event.id}`, lang)}
                  className="group relative h-[280px] md:h-[320px] rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 block"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={event.cover}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {event.title}
                    </h2>
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-white">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span className="text-base md:text-lg">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span className="text-base md:text-lg font-semibold">{event.date}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
