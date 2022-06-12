<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Psy\Util\Str;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $faker = Faker::create('id_ID');

        for ($i=0;$i<10;$i++){
            DB::table('barangs')->insert([
            'name'=> $faker->name,
            'image_url'=>'https://kliknusae.com/img/404.jpg',
            'buying_price'=>$faker->numberBetween(10000,20000),
            'selling_price'=>$faker->numberBetween(20000,40000),
            'stock'=>$faker->numberBetween(10,30),
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now()
            ]);
        }
    }
}
