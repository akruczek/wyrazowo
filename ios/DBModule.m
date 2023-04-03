//
//  DBModule.m
//  ScrabbleHelper
//
//  Created by Adam Kruczek on 03/04/2023.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(DBModule, NSObject)
  RCT_EXTERN_METHOD(findPossibleWords:
    (NSString *) param
  )
@end
