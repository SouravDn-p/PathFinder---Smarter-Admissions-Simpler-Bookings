import Image from "next/image";
import Link from "next/link";
import { Calendar, Users, Trophy, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CollegeCard({ college }) {
  return (
    <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 rounded-2xl">
      <CardHeader className="p-0 relative">
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={college.image || "/placeholder.svg"}
            alt={college.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
              <Star className="w-3 h-3 mr-1" />
              {college.rating}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4">
            <h3 className="text-white font-bold text-xl">{college.name}</h3>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span className="text-sm">{college.admissionDate}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <BookOpen className="w-4 h-4 text-green-500" />
            <span className="text-sm">{college.researchCount} Research</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-600">
              Events: {college.events?.length || 0}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-600">
              Sports: {college.sports?.length || 0}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">
          {college.description}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Link href={`/colleges/${college._id}`} className="w-full">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 hover:shadow-lg">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
