
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, LayoutGrid } from "lucide-react";
import { GameStatus } from "@/types/gameTypes";

interface CardMarketProps {
  title: string;
  type: string;
  slug: string;
  status: GameStatus;
  timeRemaining?: string;
  imageUrl?: string;
  gameCount: number;
}

const CardMarket: React.FC<CardMarketProps> = ({
  title,
  type,
  slug,
  status,
  timeRemaining,
  imageUrl,
  gameCount
}) => {
  const statusColors = {
    open: "bg-queen-success text-white",
    closed: "bg-queen-error text-white",
    upcoming: "bg-queen-warning text-white",
  };

  return (
    <div className="group h-full">
      <div className="relative h-full rounded-xl overflow-hidden border border-white/10 bg-queen-card transition-all duration-300 hover:shadow-xl hover:border-queen-gold/30 hover:translate-y-[-5px]">
        {/* Card Image */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url(${
                imageUrl ||
                "https://images.unsplash.com/photo-1587573578112-9a9ec2615dc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              })`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-queen-dark via-transparent to-transparent" />
          
          {/* Market Status Badge */}
          <div className="absolute top-4 right-4 z-10">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                statusColors[status]
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5">
          <div className="mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-queen-gold">
              {type}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-queen-gold transition-colors">
            {title}
          </h3>

          {/* Game Count */}
          <div className="flex items-center text-sm text-queen-text-secondary mb-2">
            <LayoutGrid className="h-4 w-4 mr-2" />
            <span>{gameCount} Game{gameCount !== 1 ? 's' : ''} Available</span>
          </div>

          {/* Time Remaining */}
          {timeRemaining && (
            <div className="flex items-center text-sm text-queen-text-secondary mb-4">
              <Clock className="h-4 w-4 mr-2" />
              <span>{timeRemaining}</span>
            </div>
          )}

          {/* Card Action */}
          <Link
            to={`/games/${slug}`}
            className="flex items-center justify-between mt-2 py-2 px-4 bg-white/5 hover:bg-queen-gold/20 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium text-white">View Market</span>
            <ArrowRight className="w-4 h-4 text-queen-gold transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardMarket;
