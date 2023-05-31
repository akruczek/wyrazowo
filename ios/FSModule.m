//
//  FSModule.m
//  Wyrazowo
//
//  Created by Adam Kruczek on 31/05/2023.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(FSModule, NSObject)
  RCT_EXTERN_METHOD(saveSearchHistory:
    (NSString*)searchHistory
  )
@end
